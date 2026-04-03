const mongodb = require("./mongodbconnection");
const fs = require("fs");
const { performance } = require("perf_hooks");

const iterations = 1000;

function randomWord(length) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const words = [];
for (let i = 0; i < iterations; i++) {
    words.push(randomWord(2));
}

let csv = "word,start,end,delta,result\n";

async function mongodbBench() {

    const db = await mongodb();
    const collection = db.collection("testing");

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const start = performance.now();

        const results = await collection.find({
            word: { $regex: word, $options: "i" }
        }).toArray();

        const end = performance.now();
        const delta = end - start;
        const resultCount = results.length;
        console.log(
            `#${i + 1} | ${word} | ${delta.toFixed(2)} ms | results: ${resultCount}`
        );
        csv += `${word},${start},${end},${delta},${resultCount}\n`;
    }
    // spara fil
    fs.writeFileSync("mongodbbenchmark.csv", csv);
    console.log("\nData saved to mongodbbenchmark.csv");

    process.exit(); // avsluta programmet
}
mongodbBench();