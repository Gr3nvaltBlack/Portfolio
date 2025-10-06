const http = require('http');

const server = http.createServer((req, res) => {
    // send a test response
    res.end('Test server');
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
})