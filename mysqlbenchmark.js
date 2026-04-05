const mysql = require('./mysqlconnection');
const fs = require('fs');
const { performance } = require("perf_hooks");
const words = JSON.parse(fs.readFileSync("words.json"));

let csv = "word,start,end,delta,result\n";

function queryDatabase(word) {
    return new Promise((resolve, reject) => {
        mysql.query(
            "SELECT * FROM testing WHERE word LIKE ?",
            [`%${word}%`],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

async function mysqlBench() {

    for (let i = 0; i < words.length; i++) {

        const word = words[i];
        const start = performance.now();

        const results = await queryDatabase(word);

        const end = performance.now();
        const delta = end - start;
        const resultCount = results.length;

        console.log(
            `#${i + 1} | ${word} | ${delta.toFixed(2)} ms | results: ${resultCount}`
        );

        csv += `${word},${start},${end},${delta},${resultCount}\n`;
    }
    //spara filen
    fs.writeFileSync("mysqlbenchmark.csv", csv);
    console.log("\nData saved to mysqlbenchmark.csv");

    process.exit();
}
mysqlBench();