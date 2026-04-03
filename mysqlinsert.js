const mysql = require('./mysqlconnection');

function randomWord(length) {
  const alfabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += alfabet.charAt(Math.floor(Math.random() * alfabet.length));
  }
  return result;
}

const values = [];

for (let i = 1; i <= 10000; i++) {
  values.push([i, randomWord(6)]);
}

mysql.query(
  "INSERT INTO testing (nummer, word) VALUES ?",
  [values],
  (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Inserted rows:", result.affectedRows);
    process.exit();
  }
);