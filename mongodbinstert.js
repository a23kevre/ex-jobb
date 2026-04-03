const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

function randomWord(length) {
  const alfabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += alfabet.charAt(Math.floor(Math.random() * alfabet.length));
  }
  return result;
}

async function insertData() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("test");
    const collection = db.collection("testing");

    let values = [];

    for (let i = 1; i <= 10000; i++) {
      values.push({
        nummer: i,
        word: randomWord(6)
      });
    }

    const result = await collection.insertMany(values);

    console.log(`Inserted ${result.insertedCount} documents`);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}
insertData();