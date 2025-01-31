const connection = require('../data/db');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
        user: "8b4e7f44c1b200",
        pass: "7f14af6ad75b3a",
    },
});

function index(req, res) {
    let sql = `SELECT doctors.*, AVG(vote) AS avg_vote 
            FROM doctors
            LEFT JOIN reviews ON doctors.id = reviews.doctor_id`;

    const params = [];
    const conditions = [];

    if (req.query.searchSpec && req.query.searchSpec.trim()) {
        conditions.push(`spec LIKE ?`);
        params.push(`%${req.query.searchSpec.trim()}%`);
    }

    // Filtro per nome (solo se presente)
    if (req.query.searchName && req.query.searchName.trim()) {
        conditions.push(`doctors.first_name LIKE ?`);
        params.push(`%${req.query.searchName.trim()}%`);
    }

    // Filtro per cognome (solo se presente)
    if (req.query.searchLastName && req.query.searchLastName.trim()) {
        conditions.push(`doctors.last_name LIKE ?`);
        params.push(`%${req.query.searchLastName.trim()}%`);
    }

    // Se ci sono condizioni, aggiungiamo la clausola WHERE
    if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Raggruppamento per ogni dottore
    sql += ` GROUP BY doctors.id`;

    // Filtro per voto medio (se specificato)
    if (req.query.vote) {
        sql += ` HAVING avg_vote >= ?`;
        params.push(req.query.vote);
    }

    // Ordina per voto medio
    sql += ` ORDER BY avg_vote DESC`;

    // Esegui la query
    connection.query(sql, params, (err, doctors) => {
        if (err) {
            console.error("Errore SQL:", err);
            return res.status(500).json({ message: err.message });
        }
        res.json({ doctors });
    });
}


function show(req, res) {
    const slug = req.params.slug;
    const sql = `
            SELECT doctors.*, AVG(vote) AS avg_vote 
            FROM doctors
            LEFT JOIN reviews
            ON doctors.id = reviews.doctor_id 
            WHERE doctors.slug = ?
            GROUP BY doctors.id`

    connection.query(sql, [slug], (err, results) => {
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
                    WHERE doctors.slug = ?`;

        connection.query(sql, [slug], (err, results) => {
            if (err) return res.status(500).json({ message: err.message })

            doctor.reviews = results

            res.json(doctor)
        })
    });
}

function storeReview(req, res) {
    const dataObj = req.body;
    const doctor_slug = req.params.slug;
    const doctor_id = parseInt(doctor_slug.split('-').pop())
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
            const createdID = results.insertId;
            const slug = `${first_name}-${last_name}-${createdID}`.toLowerCase().replace(/\s+/g, "_")
            connection.query(`UPDATE doctors SET slug='${slug}' WHERE id=${createdID}`)
            console.log(results);
            res.status(201).json({
                message: 'Dottore inserito con successo',
                id: results.insertId,
            });
        }
    );
}


function contact(req, res) {
    const { from, to, subject, text, html } = req.body;

    transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
    })
        .then(info => {
            console.log("Email inviata: %s", info.messageId);
            res.status(200).json({ success: true, messageId: info.messageId });
        })
        .catch(error => {
            console.error("Errore nell'invio email:", error);
            res.status(500).json({ success: false, error: error.message });
        });

}


module.exports = { index, show, storeReview, storeDoctor, contact }
