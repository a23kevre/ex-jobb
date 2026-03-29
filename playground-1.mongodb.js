// Select the database to use.
use('test');

// Insert a few documents into the testing collection.
db.getCollection('testing').insertMany([
  { nummer: 1, word: "nummer1" },
  { nummer: 2, word: "nummer2" },
  { nummer: 3, word: "nummer3" },
  { nummer: 4, word: "nummer4" },
  { nummer: 5, word: "nummer5" }
]);
