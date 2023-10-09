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
  let pLeg = turn * 3;
  let pRare = turn * 5 + 20;
  let randomNum = Math.floor(Math.random() * 100) + 1;
  if (randomNum <= pBoss && turn >= 16) {
    fromDatabase('boss', res);
  }
  else if (randomNum <= pLeg && turn >= 12) {
    fromDatabase('legendary', res);
  }
  else if (randomNum <= pRare && turn >= 3) {
    fromDatabase('rare', res);
  }
  else {
    fromDatabase('common', res);
  }
});

app.post('/fight',(req,res)=>{
  let result = Math.floor(Math.random() * 6) + 1;
  let monsterPower = req.body['monsterPower'];
  let weapon = req.body['weapon'];
  let dice = req.body['dice'];
  let roll = Math.floor(Math.random() * (dice)) + 1;
  if (dice === 0) roll = 0;
  let outcome = result + roll + weapon - monsterPower;
  if (outcome > 0) win = 'win';
  else if (outcome < 0) win = 'lost';
  else win = 'draw';
  res.json({
    win: win, 
    end: req.body['boss'],
    result: `${result} + ${weapon} + ${roll}`
  });
});

app.post('/reward',(req,res)=>{
  let colour = req.body['colour'];
  let item = Math.floor(Math.random() * 2);
  let increment;
  let weapon = 0;
  let dice = 0;
  let msg;
  if (colour === 'lightgray') {
    increment = Math.floor(Math.random() * 2);
  }
  else if (colour === 'lightblue') {
    increment = Math.floor(Math.random() * 2) + 1;
  }
  else {
    increment = Math.floor(Math.random() * 4) + 2;
  }
  if (item) {
    weapon = increment;
    msg = `You have gained an upgrade to your gear of +${increment}`;
  }
  else {
    dice = increment;
    msg = `You have gained an upgrade to your second dice of +${increment}`;
  }
  res.json({
    weapon: weapon,
    dice: dice,
    msg: msg
  })
});

app.get('/about', (req,res)=>{
  fs.readFile('templates/about.html', (err, data) => {
    if (err) {
      console.error('problem loading the file');
      res.status(500).send('Internal Server Error');
    } else {
      res.write(data);
      res.end();
    }
  });
});

app.get('/',(req,res)=>{
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