const fs = require("fs");

// seedad random<
function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function randomWord(length, seed) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < length; i++) {
        const rand = seededRandom(seed + i);
        result += chars.charAt(Math.floor(rand * chars.length));
    }

    return result;
}

// skapa dataset
const data = [];

for (let i = 1; i <= 10000; i++) {
    data.push({
        nummer: i,
        word: randomWord(6, i)
    });
}
//spara filen
fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

console.log("Dataset saved to data.json");

/////////////////////////////////////////////////////////////////

function randomSearchWord(length, seed) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < length; i++) {
        const rand = seededRandom(seed + i);
        result += chars.charAt(Math.floor(rand * chars.length));
    }

    return result;
}

const words = [];

for (let i = 0; i < 1000; i++) {
    words.push(randomSearchWord(2, i));
}

fs.writeFileSync("words.json", JSON.stringify(words, null, 2));

console.log("Search words saved to words.json");