const  { createServer } = require('node:http');
const fs = require('fs');
const mysqlSearch = require('./mysqlfetch');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {

    const mysqlUrl = new URL(req.url, `http://${req.headers.host}`);

    if (mysqlUrl.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error loading this file');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }
    else if (mysqlUrl.pathname === '/search') {
        mysqlSearch(req, res, mysqlUrl);
    }
    else {
        res.statusCode = 404;
        res.end('Not found');
    }
    
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});