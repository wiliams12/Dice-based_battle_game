var monsterImg = document.getElementById('image');
var monsterName = document.getElementById('name');
var monsterPower = document.getElementById('power');
var diceResult = document.getElementById('result');
var diceDiv = document.getElementById('dice');
var diceBtn = document.getElementById('roll-dice');
var card = document.getElementById('card');
var wonBox = document.getElementById('won-box');
var lostBox = document.getElementById('lost-box');
var drawBox = document.getElementById('draw-box');
var continueBtns = document.querySelectorAll('.continue');
var item = document.getElementById('item');
var turn = 0;
var lives = 3;
var scndDice = 0;
var weapon = 0;

function updateInfo() {
    document.getElementById('lives').innerHTML = 'Lives: '+lives;
    document.getElementById('turns').innerHTML = 'Turns: '+(turn+1);
    document.getElementById('gear').innerHTML = 'Gear upgrade: '+(weapon);
    document.getElementById('scnd-dice').innerHTML = 'Second dice: '+(scndDice);
}


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
        if (data.rarity === 'common') card.style.backgroundColor = 'lightgray'
        else if (data.rarity === 'rare') card.style.backgroundColor = 'lightblue'
        else if (data.rarity === 'legendary') card.style.backgroundColor = 'yellow'
        else card.style.backgroundColor = 'crimson'
        document.getElementById('card').style.display = 'block';
        document
        .getElementById('dice').style.display = 'block';
    });
}

loadCard(turn);
updateInfo();

diceBtn.addEventListener('click',()=>{
    diceBtn.style.visibility = 'hidden';
    fetch('/fight',{
        method: 'POST',
        body: JSON.stringify({
            monsterPower: monsterPower.innerHTML,
            boss: (card.style.backgroundColor === 'crimson'),
            dice: scndDice,
            weapon: weapon
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        diceResult.innerHTML = data.result;
        if (data.end) {
            if (data.win === 'win') { // add to specs that boss wins on draw
                setTimeout(()=>{
                    card.style.display = 'none';
                    diceDiv.style.display = 'none';
                    document.getElementById('game-won').style.display = 'block';
                },1100)
            }
            else {
                setTimeout(()=>{
                    card.style.display = 'none';
                    diceDiv.style.display = 'none';
                    document.getElementById('game-lost').style.display = 'block';
                },1100)
            }
        }
        else if (data.win === 'win') {
            setTimeout(()=>{
                card.style.display = 'none';
                diceDiv.style.display = 'none';
                wonBox.style.display = 'block';
                fetch('/reward', {
                    method: 'POST',
                    body: JSON.stringify({
                        colour: card.style.backgroundColor
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    item.innerHTML = data.msg;
                    weapon += data.weapon;
                    scndDice += data.dice;
                });
            },900)
        }
        else if (data.win === 'lost') {
            setTimeout(()=>{
                item.innerHTML = '';
                card.style.display = 'none';
                diceDiv.style.display = 'none';
                lostBox.style.display = 'block';
                lives --;
                updateInfo();
            },900)
        }
        else {
            setTimeout(()=>{
                item.innerHTML = '';
                card.style.display = 'none';
                diceDiv.style.display = 'none';
                drawBox.style.display = 'block';
                updateInfo();
            },900)
        }
    })
});
continueBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        turn ++;
        updateInfo();
        if (lives > 0) {
            loadCard(turn);
            card.style.display = 'block';
            diceDiv.style.display = 'block';
            lostBox.style.display = 'none';
            wonBox.style.display = 'none';
            drawBox.style.display = 'none';
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
