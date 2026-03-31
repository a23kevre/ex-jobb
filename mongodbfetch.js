const connectMongoDB = require("./mongodbconnection");

async function mongodbSearch(req, res, mongodbUrl) {
  try {
    const db = await connectMongoDB();
    const collection = db.collection("testing");

    let searchWord = mongodbUrl.searchParams.get("query") || "";

    const results = await collection.find({word: { $regex: searchWord, $options: "i" }}).toArray();

    res.setHeader("Content-Type", "text/html");

    let html = `<h1>Sökresultat för: ${searchWord}</h1>`;

    if (results.length === 0) {
      html += `<p>Inga resultat hittades</p>`;
    } 
    else {
      results.forEach(doc => {
        html += `<p>word ${doc.word}, nummer (${doc.nummer})</p><br>`;
      });
    }
    res.end(html);

  } 
  catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Database error");
  }
}
module.exports = mongodbSearch;