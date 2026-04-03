// Select the database to use.
use('test');

function randomWord(length) {
  const alfabet = "abcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += alfabet.charAt(Math.floor(Math.random() * alfabet.length));
  }
  return result;
}

let values = []; // array med alla ord för att kunna göra insertmany

for (let i = 1; i <= 10000; i++) {
  values.push({
    nummer: i,
    word: randomWord(6)
  });
}
db.getCollection('testing').insertMany(values);
