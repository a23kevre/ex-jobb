const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

let db;

async function connectMongoDB() {
  if (!db) {
    await client.connect();
    console.log("Connected to MongoDB!");
    db = client.db("test");
  }
  return db;
}
module.exports = connectMongoDB;