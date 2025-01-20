const connection = require("../data/db");

function index(req, res) {
  const sql = `SELECT * FROM doctors`;
  connection.query(sql, (err, doctors) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ doctors });
  });
}

function storeDoctors(req, res) {
  const { first_name, last_name, adress, email, phone, spec } = req.body;

  if (!first_name || !last_name || !email || !phone) {
    return res.status(400).json({ message: "Dati invalidi" });
  }

  const sql =
    "INSERT INTO doctors (first_name, last_name, address, email, phone, spec) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    sql,
    [first_name, last_name, adress, email, phone, spec],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(results);
      res.status(201).json({
        message: "Dottore inserito con successo",
        id: results.insertId,
      });
    }
  );
}
module.exports = { index, storeDoctors };
