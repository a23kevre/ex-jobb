const  { createServer } = require('node:http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
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
});

server.listen(port, hostname, () => {
    console.log('Server running at https://${hostname}:${port}/');
});