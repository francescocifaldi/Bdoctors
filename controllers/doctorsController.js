const connection = require ('../data/db')

function index(req, res) {
    const sql = `SELECT * FROM doctors`
    connection.query(sql, (err, doctors) => {
        if (err) return res.status(500).json({ message: err.message })
        res.json({ doctors})
    })
}

module.exports = {index}