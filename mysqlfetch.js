let mysql = require('./mysqlconnection');
mysql.query('select * from testing', (err, rows) => {
    if (err) throw err;
    console.log(rows);
});