var monsterImg = document.getElementById('image');
var monsterName = document.getElementById('name');
var monsterPower = document.getElementById('power');
var diceResult = document.getElementById('result');
var diceDiv = document.getElementById('dice');
var diceBtn = document.getElementById('roll-dice');
var card = document.getElementById('card');
var wonBox = document.getElementById('won-box');
var lostBox = document.getElementById('lost-box');
var continueBtns = document.querySelectorAll('.continue');
var turn = 0;
var lives = 3;

function loadCard(turn) { // add rarities
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
    diceBtn.style.visibility = 'hidden';
    fetch('/fight',{ // useless fetch, could be done on frontend
        method: 'POST',
        body: JSON.stringify({ // add weapons later on
            result: result,
            monsterPower: monsterPower.innerHTML
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        if (data.win) {
            setTimeout(()=>{
                card.style.display = 'none';
                diceDiv.style.display = 'none';
                wonBox.style.display = 'block';
            },1500)
        }
        else {
            setTimeout(()=>{
                card.style.display = 'none';
                diceDiv.style.display = 'none';
                lostBox.style.display = 'block';
                lives --;
            },1500)
        }
    })
});
continueBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        console.log('cliked a button')
        turn ++;
        if (lives > 0) {
            loadCard(turn);
            card.style.display = 'block';
            diceDiv.style.display = 'block';
            lostBox.style.display = 'none';
            wonBox.style.display = 'none';
            diceBtn.style.visibility = 'visible';
            diceResult.innerHTML = '';
        }
        else {
            card.style.display = 'none';
            diceDiv.style.display = 'none';
            document.getElementById('game-lost').style.display = 'block';
        }
    });

});
