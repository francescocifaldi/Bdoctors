const connection = require("../data/db");

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

module.exports = { index, storeReview, storeDoctors };
