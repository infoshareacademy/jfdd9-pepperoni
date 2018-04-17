var scoreSection = document.getElementById("score");
var gameBoard = document.getElementById("game");
var score = 0;
var arrayWithSlots = [];
var positionPerson;
var personWidth = 40;
var civilianProbability = 0.1;
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
    update()
    gameInterval = setInterval(update, 5000);
}

function finishGame() {
    clearBoard();
    window.clearInterval(gameInterval);
}

runGame();

//TODO: welcome screen with instructions, game over screen (with points gathered & restart button, records?