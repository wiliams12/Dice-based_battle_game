const fs = require('fs');
const sqlite3 = require('sqlite3');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('static'));

app.use(bodyParser.json());

const db = new sqlite3.Database('monsters.db', sqlite3.OPEN_READONLY);

function fromDatabase(rarity, res) {
  db.all(
      `SELECT * FROM ${rarity}`,
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
          monsterRarity = rarity;
          res.json({
            name: monsterName,
            power: monsterPower,
            img: monsterImg,
            rarity: rarity
          })
        }
      }
    );
}

app.post('/get-enemy',(req,res)=>{
  let turn = req.body['turn'];
  let pBoss = turn;
  let pLeg = turn * 2;
  let pRare = turn * 3 + 20;
  let randomNum = Math.floor(Math.random() * 100) + 1;
  if (randomNum <= pBoss) {
    fromDatabase('boss', res);
  }
  else if (randomNum <= pLeg) {
    fromDatabase('legendary', res);
  }
  else if (randomNum <= pRare) {
    fromDatabase('rare', res);
  }
  else {
    fromDatabase('common', res);
  }
});

app.post('/fight',(req,res)=>{
  let result = req.body['result'];
  let monsterPower = req.body['monsterPower'];
  let win = (result - monsterPower) > 0;
  res.json({win: win});
});

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