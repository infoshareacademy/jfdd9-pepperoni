var gameBoard = document.getElementById("game");
var gangster = document.createElement("div");
var civilian = document.createElement("div");
var scoreSection = document.getElementById("score");



var boardGameWidth = gameBoard.offsetWidth;

function findSlots(personWidth) {
    return boardGameWidth/personWidth;
}

//Creating array of available pixel slots. The function accepts person's width as an argument.
function createArrayWithSlots(personWidth) {
    return arrayWithSlots = Array.from({length: findSlots(personWidth)}, function (element, index) {return index * personWidth});
}

createArrayWithSlots(40);
var positionPerson;

function generatePerson(person){
    if (arrayWithSlots.length === 0) {
        return;
    }
    var personNode = document.createElement("div");
    gameBoard.appendChild(personNode);
    personNode.classList.add("person");
    personNode.classList.add(person);

    positionPerson = arrayWithSlots[Math.floor(Math.random() * arrayWithSlots.length)];

    personNode.style.left = positionPerson + "px";

    arrayWithSlots.splice(arrayWithSlots.indexOf(positionPerson), 1);
}



var personInterval = setInterval(function() {
    if (Math.random() > 0.2) {
        generatePerson("gangster")
    } else {
        generatePerson('civilian')
    }
}, 500);

var score = 0;

gameBoard.addEventListener("click", function(event) {
    var clickedElement = event.target;
    if (clickedElement.classList.contains("person")) {
        gameBoard.removeChild(clickedElement);
        arrayWithSlots.push(parseInt(clickedElement.style.left));
        if (clickedElement.classList.contains("gangster")) {
            score += 100;
        } else if (clickedElement.classList.contains("civilian")) {
            score -= 100;
        }
    }
    scoreSection.innerText = "Score: " + score;
});

