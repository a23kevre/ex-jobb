const mysql = require('./mysqlconnection');
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json"));

const values = data.map(row => [row.nummer, row.word]);

mysql.query("INSERT INTO testing (nummer, word) VALUES ?", [values], (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Inserted rows:", result.affectedRows);
    process.exit();
  }
);