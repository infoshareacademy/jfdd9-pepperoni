var scoreSection = document.getElementById("score");
var scoreCiviliansSection = document.getElementById("scoreCivilians");
var gameBoard = document.getElementById("game");
var score = 0;
var arrayWithSlots = [];
var positionPerson;
var personWidth;
var civilianProbability = 0.4;
var gameInterval;
var civiliansKilled = 0;
var dif_level = 0; // 0 - novice, 1 - brutal
var randomNum = Math.floor((Math.random() * 4) +1 );
var ammoHTML = document.getElementsByClassName("ammo");
var ammo = Array.prototype.slice.call(ammoHTML);
var ammunition = 5;
var lifeHTML = document.getElementsByClassName("heart");
var life = Array.prototype.slice.call(lifeHTML);
var lifeLeft = 5;
var mainNormalInterval = 3000;
var mainHardInterval = 1500;
var mainChosenInterval;
var gunshot = document.getElementById('gunshot');
var noAmmo = document.getElementById('noAmmo');
var scream = document.getElementById('scream');
var screamCyvilian = document.getElementById('screamCyvilian');
var shotKiller = document.getElementById('shotKiller');
var reloadSound = document.getElementById('reload');
var youWereKilled = '';

var classes = ["gangster1", "gangster2", "gangster3", "gangster4"];

var mediaQuery = window.matchMedia("(max-width: 609px)");
if (mediaQuery.matches) {
    personWidth = 40;
} else {
    personWidth = 80;
}


//Creating array of available pixel slots. The function accepts person's width as an argument.
var boardGameWidth = gameBoard.offsetWidth;


function playAudio (sound) {
    sound.currentTime = 0;
    sound.play();
}

function reload() {
    ammunition = 5;
    ammo.forEach(function (bullet) {
        if (bullet.classList.contains("transparent")) {
            bullet.classList.remove("transparent");
            bullet.classList.add("opaque")
        }
    })
}

function removeBullet() {
    ammo[ammunition - 1].classList.remove("opaque");
    ammo[ammunition - 1].classList.add("transparent");
    if (ammunition > 0) {
        ammunition = ammunition - 1;
    }
}

window.addEventListener('keydown', function (event) {
    if (event.code === 'KeyR') {
        playAudio(reloadSound);
        reload();
    }
});

ammo.forEach(function (singleAmmo) {
    singleAmmo.addEventListener('click', function (event) {
        playAudio(reloadSound);
        reload();
    });
});


function findSlots(personWidth) {
    return boardGameWidth / personWidth;
}

function recreateArrayWithSlots(personWidth) {
    arrayWithSlots = Array.from({length: findSlots(personWidth)}, function (element, index) {
        return index * personWidth
    });
}

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

function killerGangsters() {
    var gangstersHTML = document.getElementsByClassName('person');
    var gangsters = Array.prototype.slice.call(gangstersHTML);
    gangsters.forEach(function(gangster){
        if (lifeLeft > 0){
            if ((gangster.classList.contains('gangster3')) && (!gangster.classList.contains('dead'))) {
                life[lifeLeft - 1].classList.remove("opaque");
                life[lifeLeft - 1].classList.add("transparent");
                lifeLeft = lifeLeft - 1;
            }
        }
    });
}

function animateKillers(){
    var gangstersHTML = document.getElementsByClassName('person');
    var gangsters = Array.prototype.slice.call(gangstersHTML);
    gangsters.forEach(function(gangster) {
        if (gangster.classList.contains('gangster3')) {
            var killerIterator = 1;
            if (!gangster.classList.contains('dead')){
                playAudio(shotKiller);
            }
            var killerAnimator = setInterval(function () {
                gangster.style.backgroundImage = 'url("./game_images/cut3/GunThree' + (killerIterator++) + '.png")';
                if (killerIterator === 5) {
                    killerIterator = 1;
                    clearInterval(killerAnimator);
                }
            },100)
        }
    })
}

function shoot(event) {
    var clickedElement = event.target;
    if (ammunition < 1) {
        playAudio(noAmmo);
        return
    }
    removeBullet();
    playAudio(gunshot);
    if (clickedElement.classList.contains('dead')) {
        return;
    }

    if (clickedElement.classList.contains("person")) {
        clickedElement.classList.add('dead');
        if (clickedElement.classList.contains("civilian")) {
            playAudio(screamCyvilian);
        } else {
            playAudio(scream);
        }

        if (classes.some(function (className) {
                return clickedElement.classList.contains(className)
            })) {
            score += 1;
        } else if (clickedElement.classList.contains("civilian")) {
            civiliansKilled += 1;
            scoreCiviliansSection.innerText = "Civilians killed: " + civiliansKilled;
            if (civiliansKilled === 3) {
                youWereKilled = "Shame on you. You killed too many civilians.";
                finishGame();
                return;
            }
        }

        var animateIterator = 1;

        var animInterval = setInterval(function () {
            if (clickedElement.classList.contains("gangster1")) {

                clickedElement.style.backgroundImage = 'url("./game_images/cut1/GunOne' + (animateIterator++) + '.png")';
            }
            if (clickedElement.classList.contains("gangster2")) {

                clickedElement.style.backgroundImage = 'url("./game_images/cut2/GunTwo' + (animateIterator++) + '.png")';
            }
            if (clickedElement.classList.contains("gangster3")) {

                clickedElement.style.backgroundImage = 'url("./game_images/cut3/GunThree' + (animateIterator++) + '.png")';
            }
            if (clickedElement.classList.contains("gangster4")) {

                clickedElement.style.backgroundImage = 'url("./game_images/cut4/GunFour' + (animateIterator++) + '.png")';
            }

            else if (clickedElement.classList.contains("civilian")) {
                clickedElement.style.backgroundImage = 'url("./game_images/civ/cyvil-' + (animateIterator++) + '.png")';
            }

            if (animateIterator === 10) {
                animateIterator = 1;
                clearInterval(animInterval);
                if (gameBoard.contains(clickedElement)) {
                    gameBoard.removeChild(clickedElement);
                }
                arrayWithSlots.push(parseInt(clickedElement.style.left));
            }

        }, 100);

    }
    scoreSection.innerText = "Score: " + score;
    scoreCiviliansSection.innerText = "Civilians killed: " + civiliansKilled;
}

function clearBoard() {
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
}

function createRandomPerson() {
    if (Math.random() > civilianProbability) {
        generatePerson(classes[Math.floor((Math.random() * 4))]);

    } else {
        generatePerson('civilian')
    }
}

function update() {
    killerGangsters();
    if (lifeLeft === 0){
        youWereKilled = "Too bad. You got yourself killed.";
        finishGame();
        return;
    }
    clearBoard();
    recreateArrayWithSlots(personWidth);
    for (var i = 0; i < 7; i++) {
        createRandomPerson();
    }
    setTimeout(animateKillers, mainChosenInterval-700);
}

function welcomeScreen() {
    gameBoard.innerHTML = '' +
        '<div>' +
        '<h2>Try the GangBook game</h2>' +
        '<p>Kill as many gangsters as possible. Shoot men in black before they shoot you.<br/>Spare the civilians! Don\'t kill more than two.</p>' +
        '<section>' +
        '<label class="container">Novice <input type="radio" name="dif-level" value="0" checked /><span class="checkmark"></span></label>' +
        '<label class="container">Brutal <input type="radio" name="dif-level" value="1" /><span class="checkmark"></span></label>' +
        '</section>' +
        '<button class="button-game" onclick="runGame()">START</button>' +
        '<p>To reload, press \'R\' or click a bullet.</p>' +
        '<p class="welcomeScreenPar">This guy is a civilian<img class="welcomeScreenImg" src="./game_images/civ/cyvil-1.png"/></p>' +
        '</div>';
}

function gameOverScreen() {
    gameBoard.innerHTML = '' +
        '<div>' +
        '<h2>GAME OVER</h2>' +
        '<p> ' + youWereKilled + ' </p>' +
        // '<p>Gangsters killed:  ' + score + '.</p>' +
        // '<p>Civilians killed: ' + civiliansKilled + '.</p>' +
        '<section>' +
        '<label class="container">Novice <input type="radio" name="dif-level" value="0" checked /><span class="checkmark"></label>' +
        '<label class="container">Brutal <input type="radio" name="dif-level" value="1" /><span class="checkmark"></label>' +
        '</section>' +
        '<button class="button-game" onclick="runGame()">RESTART GAME</button>' +
        '</div>';
}

function runGame() {
    lifeLeft = 5;
    dif_level = document.querySelector('[name="dif-level"]:checked').value;
    mainChosenInterval = dif_level === '1' ? mainHardInterval : mainNormalInterval;
    gameBoard.addEventListener("mousedown", shoot);
    resetScores();
    update();
    reload();
    life.forEach(function(element) {
        element.classList.remove("transparent");
        element.classList.add("opaque");
    });

    gameInterval = setInterval(update, mainChosenInterval);
}

function finishGame() {
    gameBoard.removeEventListener("mousedown", shoot);
    life.forEach(function(element) {
        element.classList.remove("opaque");
        element.classList.add("transparent");
    });
    ammo.forEach(function (bullet) {
        bullet.classList.remove("opaque");
        bullet.classList.add("transparent")
    });
    clearBoard();
    window.clearInterval(gameInterval);
    gameOverScreen();
}

function resetScores() {
    score = 0;
    civiliansKilled = 0;
}

welcomeScreen();