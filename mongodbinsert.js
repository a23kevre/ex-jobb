const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json"));

async function insertData() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("test");
    const collection = db.collection("testing");

    const result = await collection.insertMany(data);

    console.log(`Inserted ${result.insertedCount} documents`);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}
insertData();