const connection = require('../data/db');

function index(req, res) {
    let sql = `SELECT doctors.*, AVG(vote) AS avg_vote 
            FROM doctors
            LEFT JOIN reviews
            ON doctors.id = reviews.doctor_id `

    if (req.query.spec) {
        sql += ` WHERE spec LIKE ?`
    }

    sql += `GROUP BY doctors.id
            ORDER BY avg_vote DESC`

    if (req.query.home)
        sql += ` LIMIT 5`

    const params = req.query.spec ? [`%${req.query.spec}%`] : [];

    connection.query(sql, params, (err, doctors) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ doctors });
    });
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const sql = `
            SELECT doctors.*, AVG(vote) AS avg_vote 
            FROM doctors
            LEFT JOIN reviews
            ON doctors.id = reviews.doctor_id 
            WHERE doctors.id = ?
            GROUP BY doctors.id`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Doctor not found',
            });

        const doctor = results[0]
        doctor.avg_vote = parseInt(doctor.avg_vote)


        const sql = `SELECT reviews.*
                    FROM reviews
                    join doctors
                    on doctors.id = reviews.doctor_id
                    WHERE doctors.id = ?`;

        connection.query(sql, [id], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            doctor.reviews = results

            res.json(doctor)
        })
    });
}

function storeReview(req, res) {
    const dataObj = req.body;
    const doctor_id = req.params.id;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(dataObj, doctor_id);

    const { first_name, last_name, email, review, vote } = dataObj;

    if (
        !first_name ||
        !last_name ||
        !email ||
        first_name.length < 3 ||
        last_name.length < 3 ||
        !emailRegex.test(email)
    ) {
        return res.status(400).json({ message: 'Dati invalidi' });
    }

    const sql = `INSERT INTO reviews (review, vote, doctor_id, first_name, last_name, email)
                VALUES (?, ?, ${doctor_id}, ?, ?, ?)`;
    connection.query(
        sql,
        [
            review,
            vote,
            first_name,
            last_name,
            email,
        ],
        (err, response) => {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            res.status(201).send();
        }
    );
}

function storeDoctor(req, res) {
    const { first_name, last_name, address, email, phone, spec } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{9,14}$/;

    if (
        !first_name ||
        !last_name ||
        !email ||
        !phone ||
        !address ||
        !spec ||
        first_name.length < 3 ||
        last_name.length < 3 ||
        address.length < 5 ||
        !emailRegex.test(email) ||
        !phoneRegex.test(phone)
    ) {
        return res.status(400).json({ message: 'Dati invalidi' });
    }

    const sql =
        'INSERT INTO doctors (first_name, last_name, address, email, phone, spec) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(
        sql,
        [first_name, last_name, address, email, phone, spec],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            console.log(results);
            res.status(201).json({
                message: 'Dottore inserito con successo',
                id: results.insertId,
            });
        }
    );
}

module.exports = { index, show, storeReview, storeDoctor };
