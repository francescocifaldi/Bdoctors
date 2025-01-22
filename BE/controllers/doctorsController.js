const connection = require('../data/db');

function index(_, res) {
    const sql = `SELECT * FROM doctors`;
    connection.query(sql, (err, doctors) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ doctors });
    });
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM doctors WHERE id = ?`;
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Doctor not found',
            });

        const doctor = results[0]

        const sql = `
            SELECT *
            FROM reviews
            WHERE doctor_id = ?`

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
            dataObj.review,
            dataObj.vote,
            dataObj.first_name,
            dataObj.last_name,
            dataObj.email,
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
