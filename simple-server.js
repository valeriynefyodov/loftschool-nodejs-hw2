const http = require('http');
const port = 3000;

function start(interval, timeout) {
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url !== '/favicon.ico') {
      console.log('GET');

      const intervalID = setInterval(() => {
        const currentDate = new Date();        
        console.log(currentDate.toUTCString());
      }, interval)

      const timeoutID = setTimeout(() => {
        clearInterval(intervalID);

        const currentDate = new Date();
        res.end(currentDate.toUTCString());
      }, timeout)
    }
  });
  
  server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

module.exports = {
  start: start
}