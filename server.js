const fs = require('fs');
const sqlite3 = require('sqlite3');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('static'));

app.use(bodyParser.json());

const db = new sqlite3.Database('monsters.db', sqlite3.OPEN_READONLY);

app.post('/get-enemy',(req,res)=>{
  let turn = req.body['turn'];
  let pBoss = turn;
  let pLeg = turn * 2;
  let pRare = turn * 3;
  // Probability for common is 100 %
  let randomNum = Math.floor(Math.random() * 10) + 1;
  if (randomNum <= pBoss) {
    db.all(
      'SELECT * FROM boss',
      [],
      (err,rows)=>{
        if (err) {
          res.status(500).send('Internal Server Error');
        }
        else {
          let index = Math.floor(Math.random() * rows.length); // to a funnction
          monsterName = rows[index]['name'];
          monsterImg = rows[index]['img'];
          monsterPower = rows[index]['power'];
          monsterRarity = 'boss';
          res.json({
            name: monsterName,
            power: monsterPower,
            img: monsterImg,
            class: monsterRarity
          })
        }
      }
    );
  }
  else if (randomNum <= pLeg) {
    db.all(
      'SELECT * FROM legendary',
      [],
      (err,rows)=>{
        if (err) {
          res.status(500).send('Internal Server Error');
        }
        else {
          let index = Math.floor(Math.random() * rows.length);
          monsterName = rows[index]['name'];
          monsterImg = rows[index]['img'];
          monsterPower = rows[index]['power'];
          monsterRarity = 'legendary';
          res.json({
            name: monsterName,
            power: monsterPower,
            img: monsterImg,
            class: monsterRarity
          })
        }
      }
    );
  }
  else if (randomNum <= pRare) {
    db.all(
      'SELECT * FROM rare',
      [],
      (err,rows)=>{
        if (err) {
          res.status(500).send('Internal Server Error');
        }
        else {
          let index = Math.floor(Math.random() * rows.length);
          monsterName = rows[index]['name'];
          monsterImg = rows[index]['img'];
          monsterPower = rows[index]['power'];
          monsterRarity = 'rare';
          res.json({
            name: monsterName,
            power: monsterPower,
            img: monsterImg,
            class: monsterRarity
          })
        }
      }
    );
  }
  else {
    db.all(
      'SELECT * FROM common',
      [],
      (err,rows)=>{
        if (err) {
          res.status(500).send('Internal Server Error');
        }
        else {
          let index = Math.floor(Math.random() * rows.length);
          monsterName = rows[index]['name'];
          monsterImg = rows[index]['img'];
          monsterPower = rows[index]['power'];
          monsterRarity = 'common';
          res.json({
            name: monsterName,
            power: monsterPower,
            img: monsterImg,
            class: monsterRarity
          })
        }
      }
    );
  }
});

app.post('/fight',(req,res)=>{
 // implement fight
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