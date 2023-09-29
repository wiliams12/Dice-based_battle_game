const http = require('http');
const fs = require('fs');
 
// Doesn't work yet; doesn't load static files correctly

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('../frontend/templates/index.html', function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end(err.message);
    } else {
      res.end(data);
    }
  });
}).listen(8080)