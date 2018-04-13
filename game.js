var gameBoard = document.getElementById("game");
var gangster = document.createElement("div");
var civilian = document.createElement("div");
var scoreSection = document.getElementById("score");

//informacja o szerokości boarda - tę informację porównać z szerokością ludzika
// i określić punkty, w których ludzik może się pojawiać.
// np. board = 300 px (wylicz JSem), a ludzik ma 30px --> 30 slotów
// Można zrobić tablicę z ilością slotów i potem, jak wylosuje się ten slot, zdejmować go z tablicy (slicem)

// Function to return random number from a range
// function getRandomPosition(min, max) {
//     return Math.random() * (max - min) + min;
// }

var boardGameWidth = gameBoard.offsetWidth;

function findSlots(personWidth) {
    return boardGameWidth/personWidth;
}

//Creating array of available pixel slots
function createArrayWithSlots () {
    return arrayWithSlots = Array.from({length: findSlots(40)}, function (element, index) {return index * 40});
}

createArrayWithSlots();
function generateGangster() {
    gameBoard.appendChild(gangster);
    gangster.classList.add("gangster", "person");
    var positionGangster = arrayWithSlots[Math.floor(Math.random() * arrayWithSlots.length)];
    gangster.style.left = positionGangster + "px";
    if (arrayWithSlots.length > 0) {
        arrayWithSlots.splice(arrayWithSlots.indexOf(positionGangster), 1);
    } else {
        createArrayWithSlots();
        arrayWithSlots.splice(arrayWithSlots.indexOf(positionGangster), 1);
    }
}

var personInterval = setInterval(generateGangster, 500);

//
//
//
// gangster.style.left = getRandomPosition(0, 95) + "%";

gameBoard.appendChild(civilian);
civilian.classList.add("civilian", "person");




var score = 0;


gameBoard.addEventListener("click", function(event) {
    var clickedElement = event.target;
    if (clickedElement.classList.contains("person")) {
        gameBoard.removeChild(clickedElement);
        if (clickedElement.classList.contains("gangster")) {
            score += 100;
        } else if (clickedElement.classList.contains("civilian")) {
            score -= 100;
        }
    }
    scoreSection.innerText = "Score: " + score;
});

