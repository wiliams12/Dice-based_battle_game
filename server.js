const fs = require('fs');
const sqlite3 = require('sqlite3');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('static'));

app.use(bodyParser.json());

const db = new sqlite3.Database('monsters.db', sqlite3.OPEN_READONLY);

app.post('/get-enemy',(req,res)=>{
  console.log(req.body['turn']);
  res.json({
    name:'Rat',
    power: 1,
    img: 'imgs/rat.jpg'
  })
});

app.post('/fight',(req,res)=>{

})

app.get("/",(req,res)=>{
  fs.readFile('templates/index.html', (err, data) => {
    if (err) {
      console.error('problem loading the file');
      res.status(500).send('Internal Server Error');
    } else {
      res.write(data);
      res.end();
    }
  });
});

app.listen(8000, () => {
    console.log(`Example app listening on port ${8000}`)
});