const connection = require('../data/db');

function index(_, res) {
    const sql = `SELECT * FROM doctors`;
    connection.query(sql, (err, doctors) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ doctors });
    });
}

function storeReview(req, res) {
    const dataObj = req.body;
    const doctor_id = req.params.id;

    console.log(dataObj, doctor_id);
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

module.exports = { index, storeReview };
