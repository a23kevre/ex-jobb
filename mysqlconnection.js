let mysql = require ('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Wowturtle123",
    database: "test",
    port: 3308
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = con;