var scoreSection = document.getElementById("score");
var scoreCiviliansSection = document.getElementById("scoreCivilians");
var gameBoard = document.getElementById("game");
var score = 0;
var arrayWithSlots = [];
var positionPerson;
var personWidth = 40;
var civilianProbability = 0.4;
var gameInterval;
var civiliansKilled = 0;

//Creating array of available pixel slots. The function accepts person's width as an argument.
var boardGameWidth = gameBoard.offsetWidth;

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

var animateIterator = 1;
gameBoard.addEventListener("click", function (event) {
    var clickedElement = event.target;
    if (clickedElement.classList.contains('dead')) {
        return;
    }
    if (clickedElement.classList.contains("person")) {
        gameBoard.removeChild(clickedElement);
        arrayWithSlots.push(parseInt(clickedElement.style.left));
        if (clickedElement.classList.contains("gangster")) {
            score += 1;
        } else if (clickedElement.classList.contains("civilian")) {
            civiliansKilled += 1;
            if (civiliansKilled === 3) {
                finishGame();
            }
        }
        clickedElement.classList.add('dead');
        var animInterval = setInterval(function () {
            clickedElement.style.backgroundImage = 'url("./game_images/cut1/GunOne' + (animateIterator++) + '.png")';
            //animate

           if (animateIterator === 8) {
                animateIterator = 1;
                clearInterval(animInterval);
                gameBoard.removeChild(clickedElement);
                arrayWithSlots.push(parseInt(clickedElement.style.left));
                if (clickedElement.classList.contains("gangster")) {
                    score += 100;
                } else if (clickedElement.classList.contains("civilian")) {
                    score -= 100;
                    civiliansKilled += 1;
                    if (civiliansKilled === 3) {
                        finishGame();
                    }
                }
            }
        }, 100);

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
        generatePerson("gangster")
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
        '<button class="button-game" onclick="runGame()">START</button>' +
        '</div>';
}

function gameOverScreen(){
    gameBoard.innerHTML = '' +
        '<div>' +
        '<h2>GAME OVER</h2>' +
        '<p>You killed ' + score + ' gangster(s).</p>' +
        '<button class="button-game" onclick="runGame()">RESTART GAME</button>' +
        '</div>';
}


function runGame() {
    update();
    gameInterval = setInterval(update, 1100);
}

function finishGame() {
    clearBoard();
    window.clearInterval(gameInterval);
    gameOverScreen();
}

welcomeScreen();

//TODO: welcome screen with instructions, game over screen (with points gathered & restart button, records?
// TODO Difficulty level - client changes difficulty level - based on this parameter either increase the number of people visible on screen or increase the speed with which they appear.