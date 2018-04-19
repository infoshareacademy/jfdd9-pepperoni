var scoreSection = document.getElementById("score");
var scoreCiviliansSection = document.getElementById("scoreCivilians");
var gameBoard = document.getElementById("game");
var score = 0;
var arrayWithSlots = [];
var positionPerson;
var personWidth = 80;
var civilianProbability = 0.4;
var gameInterval;
var civiliansKilled = 0;
var animateIterator = 1;
var dif_level = 0; // 0 - novice, 1 - brutal
var randomNum = Math.floor((Math.random() * 4) +1 );


//Creating array of available pixel slots. The function accepts person's width as an argument.
var boardGameWidth = gameBoard.offsetWidth;

function reload() {
    var weapon = document.getElementById('weapon');


    for (var i=0; i < 6; i++){

        var div = document.createElement('div');
        div.classList.add('ammo');
        weapon.appendChild(div);
    }

}

window.addEventListener('keydown', function (event) {
console.log(event.code)
    if (event.code === 'KeyR') {
    reload();
    }
})


function findSlots(personWidth) {
    return boardGameWidth / personWidth;
}

function recreateArrayWithSlots(personWidth) {
    arrayWithSlots = Array.from({length: findSlots(personWidth)}, function (element, index) {
        return index * personWidth
    });
}
////

function generatePerson(personClass) {
    if (arrayWithSlots.length === 0) {
        return;
    }
    var personNode = document.createElement("div");

    personNode.classList.add("person");
    personNode.classList.add(personClass);

    positionPerson = arrayWithSlots[Math.floor(Math.random() * arrayWithSlots.length)];
    personNode.style.left = positionPerson + "px";

    gameBoard.appendChild(personNode);

    arrayWithSlots.splice(arrayWithSlots.indexOf(positionPerson), 1);
}

gameBoard.addEventListener("click", function (event) {
    var clickedElement = event.target;

    if (clickedElement.classList.contains('dead')) {
        return;
    }

    if (!weapon.firstChild) {
        // reload();
        return
    }
    weapon.removeChild(weapon.firstChild);

    if (clickedElement.classList.contains("person")) {
        clickedElement.classList.add('dead');
        if (clickedElement.classList.contains("gangster")) {
            score += 1;
        } else if (clickedElement.classList.contains("civilian")) {
            civiliansKilled += 1;
            if (civiliansKilled === 3) {
                finishGame();
            }
        }

    var animInterval = setInterval(function () {
        if (clickedElement.classList.contains("gangster")) {

        clickedElement.style.backgroundImage = 'url("./game_images/cut1/GunOne' + (animateIterator++) + '.png")';
        }

        else if (clickedElement.classList.contains("civilian")) {
            clickedElement.style.backgroundImage = 'url("./game_images/civ/cyvil-' + (animateIterator++) + '.png")';

        }

       if (animateIterator === 10) {
            animateIterator = 1;
            clearInterval(animInterval);
            gameBoard.removeChild(clickedElement);
            arrayWithSlots.push(parseInt(clickedElement.style.left));
        }

    }, 40);

    }
    scoreSection.innerText = "Score: " + score;
    scoreCiviliansSection.innerText = "Civilians killed: " + civiliansKilled;
});

function clearBoard() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
}


function createRandomPerson() {
    if (Math.random() > civilianProbability) {
        generatePerson("gangster") //&& randomNum <= 4;
    } else {
        generatePerson('civilian')
    }
}

function update() {
    clearBoard();
    recreateArrayWithSlots(personWidth);
    for (var i = 0; i<5; i++) {
        createRandomPerson();
    }

}


function welcomeScreen(){
    gameBoard.innerHTML = '' +
        '<div>' +
        '<h2>Try the GangBook game</h2>' +
        '<p>Kill as many gansgters as possible.<br/>But beware! Spare the civilians! Don\'t kill more than two.</p>' +
        '<section>'+
        '<label>Novice <input type="radio" name="dif-level" value="0" checked /></label>' +
        '<label>Brutal <input type="radio" name="dif-level" value="1" /></label>' +
        '</section>'+
        '<button class="button-game" onclick="runGame()">START</button>' +
        '</div>';
}

function gameOverScreen(){
    gameBoard.innerHTML = '' +
        '<div>' +
        '<h2>GAME OVER</h2>' +
        '<p>You killed ' + score + ' gangster(s).</p>' +
        '<p>But you also killed 3 civilians.</p>' +
        '<section>'+
        '<label>Novice <input type="radio" name="dif-level" value="0" checked /></label>' +
        '<label>Brutal <input type="radio" name="dif-level" value="1" /></label>' +
        '</section>'+
        '<button class="button-game" onclick="runGame()">RESTART GAME</button>' +
        '</div>';
}


function runGame() {
    dif_level = document.querySelector('[name="dif-level"]:checked').value;
    resetScores();
    update();
    reload();
    gameInterval = setInterval(update, dif_level === '1' ? 1000 : 3000);
}

function finishGame() {
    clearBoard();
    window.clearInterval(gameInterval);
    gameOverScreen();
}

function resetScores() {
    score = 0;
    civiliansKilled = 0;
}

welcomeScreen();

//TODO: welcome screen with instructions, game over screen (with points gathered & restart button, records?
// TODO Difficulty level - client changes difficulty level - based on this parameter either increase the number of people visible on screen or increase the speed with which they appear.