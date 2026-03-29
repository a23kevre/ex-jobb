// Select the database to use.
use('test');

// Loop insert nummer1->nummer50
for (let i = 1; i <= 50; i++) {
  db.getCollection('testing').insertOne({
    nummer: i,
    word: "nummer" + i
  });
}