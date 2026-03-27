const mysql = require('./mysqlconnection');
const fs = require('fs');

const iterations = 50;

// array med nummer1->nummer50
const words = [];
for (let i = 1; i <= iterations; i++) {
    words.push(`nummer${i}`);
}

let csv = "word,start,end,delta,result\n";

async function mysqlBench() {

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const start = performance.now();
        const rows = await new Promise((resolve, reject) => {
            mysql.query('SELECT * FROM testing WHERE word LIKE ?', [`%${word}%`],(err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        const end = performance.now();
        const delta = end - start;
        const resultCount = rows.length;
        console.log(
            `#${i + 1} | ${word} | ${delta.toFixed(2)} ms | results: ${resultCount}`
        );
        csv += `${word},${start},${end},${delta},${resultCount}\n`;
    }
    // spara filen
    fs.writeFileSync('mysqlbenchmark.csv', csv);
    console.log("\n Finished! Data saved to mysqlbenchmark.csv");
}
mysqlBench();