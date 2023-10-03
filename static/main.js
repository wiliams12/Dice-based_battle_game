var monsterImg = document.getElementById('image');
var monsterName = document.getElementById('name');
var monsterPower = document.getElementById('power');
var diceResult = document.getElementById('result');
var diceBtn = document.getElementById('dice');
var turn = 0;

function loadCard(turn) {
    fetch('/get-enemy', {
        method: 'POST',
        body: JSON.stringify({turn: turn}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        monsterName.innerHTML = data.name;
        monsterPower.innerHTML = data.power;
        monsterImg.src = data.img;
        document.getElementById('card').style.display = 'block';
        document
        .getElementById('dice').style.display = 'block';
    });
}

function rollTheDice() {
    return Math.floor(Math.random() * 6) + 1;
}

loadCard(turn);
diceBtn.addEventListener('click',()=>{
    let result = rollTheDice();
    diceResult.innerHTML = result;
    fetch('/fight',{
        method: 'POST',
        body: JSON.stringify({result: result}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{

    })
});

