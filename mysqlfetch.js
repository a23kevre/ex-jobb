let mysql = require('./mysqlconnection');

function mysqlSearch(req, res, mysqlUrl) {

    let searchWord = mysqlUrl.searchParams.get('query') || '';

    mysql.query('SELECT * FROM testing WHERE word LIKE ?',[`%${searchWord}%`], (err, rows) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Database error');
            return;
        } 
        
        res.setHeader('Content-Type', 'text/html');

        let html = `<h1>Sökresultat för: ${searchWord}</h1>`;

        if (rows.length === 0) {
            html += `<p>Inga resultat hittades</p>`;
        }
        else {
            rows.forEach(row => {
                html += `<p> word ${row.word}, nummer (${row.nummer})</p>`;
                html += `<br></br>`;
            });
        }

        res.end(html);
    });
}
module.exports = mysqlSearch;