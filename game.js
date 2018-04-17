var scoreSection = document.getElementById("score");
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


gameBoard.addEventListener("click", function (event) {
    var clickedElement = event.target;
    if (clickedElement.classList.contains("person")) {
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
    scoreSection.innerText = "Score: " + score;
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
    document.querySelector('#game').innerHTML = '' +
        '<div style="background-color: rgba(255,255,255,0.5); padding-bottom: 0; height:100%">' +
        '<h1 style="font-size: 50px; margin-top: 0; padding: 30px; margin-bottom: 0px">Game rules</h1>' +
        '<p style="font-size: 20px">Zabij jak największą ilość nieproszonych gości. Gra kończy się po zabiciu trzech niewinnych świadków. </p>' +
        '<button class="button-game" onclick="runGame()">Start game</button>' +
        '</div>';
}


function runGame() {
    update();
    gameInterval = setInterval(update, 1100);
}

function finishGame() {
    clearBoard();
    window.clearInterval(gameInterval);
}

welcomeScreen();

//TODO: welcome screen with instructions, game over screen (with points gathered & restart button, records?