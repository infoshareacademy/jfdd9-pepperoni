var gameBoard = document.getElementById("game");
var gangster = document.createElement("div");
var civilian = document.createElement("div");
var scoreSection = document.getElementById("score");



gameBoard.appendChild(gangster);
gangster.classList.add("gangster", "person");

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

