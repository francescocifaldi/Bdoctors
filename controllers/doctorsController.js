const connection = require('../data/db')

function index(req, res) {
    const sql = `SELECT * FROM doctors`
    connection.query(sql, (err, doctors) => {
        if (err) return res.status(500).json({ message: err.message })
        res.json({ doctors })
    })
}

function show(req, res) {

    const id = parseInt(req.params.id)
    const sql = `SELECT * FROM doctors WHERE id = ?`
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message })
        if (results.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Doctor not found',
            })
        res.json(results)
    })
}

module.exports = { index, show }