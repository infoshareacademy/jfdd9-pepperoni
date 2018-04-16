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


function runGame() {
    gameInterval = setInterval(update, 1100);
}

function finishGame() {
    clearBoard();
    window.clearInterval(gameInterval);
}

runGame();

