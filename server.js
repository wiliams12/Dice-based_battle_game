const http = require('http');
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static('static'));
// Doesn't work yet; doesn't load static files correctly

app.get("/",(req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('templates/index.html', function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end(err.message);
      } else {
        res.end(data);
      }
    });
});

app.listen(8000, () => {
    console.log(`Example app listening on port ${8000}`)
});