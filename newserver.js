const { createServer } = require("node:http");
const fs = require("fs");
const mongodbSearch = require("./mongodbfetch");

const hostname = "127.0.0.1";
const port = 4000;

const server = createServer((req, res) => {

const mongodbUrl = new URL(req.url, `http://${req.headers.host}`);

    if (mongodbUrl.pathname === "/") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error loading file");
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    }
    else if (mongodbUrl.pathname === "/search") {
      mongodbSearch(req, res, mongodbUrl);
    }
    else {
      res.statusCode = 404;
      res.end("Not found");
    }

});

server.listen(port, hostname, () => {
    console.log(`MongoDB server running at http://${hostname}:${port}/`);
});