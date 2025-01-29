const connection = require('../data/db');

function index(req, res) {
    let sql = `SELECT doctors.*, AVG(vote) AS avg_vote 
            FROM doctors
            LEFT JOIN reviews ON doctors.id = reviews.doctor_id`;

    const params = [];
    const conditions = [];

    // Filtro per specializzazione
    if (req.query.searchSpec) {
        conditions.push(`spec LIKE ?`);
        params.push(`%${req.query.searchSpec}%`);
    }

    // Filtro per nome
    if (req.query.searchName) {
        conditions.push(`doctors.first_name LIKE ?`);
        params.push(`%${req.query.searchName}%`);
    }

    // Filtro per cognome
    if (req.query.searchLastName) {
        conditions.push(`doctors.last_name LIKE ?`);
        params.push(`%${req.query.searchLastName}%`);
    }

    // Unisci le condizioni
    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(' AND ')}`;
    }


    // Aggiungi il raggruppamento per ogni dottore
    sql += ` GROUP BY doctors.id`;

    // Aggiungi il filtro per voto medio (usando HAVING)
    if (req.query.vote) {
        sql += ` HAVING avg_vote >= ?`;
        params.push(req.query.vote);
    }

    // Ordina per voto medio
    sql += ` ORDER BY avg_vote DESC`;


    connection.query(sql, params, (err, doctors) => {
        if (err) {
            console.error("Errore SQL:", err);
            return res.status(500).json({ message: err.message });
        }
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
