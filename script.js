var buttonNode = document.getElementById('subscribe');

var elementsToAnimate = document.getElementsByClassName("feature-description");
var arrayToAnimate = [].slice.call(elementsToAnimate);
var secretKeys = [];


//Function to check if an element is in viewport. As an argument, pass the id of the element you want to check.
function isInViewport(element, tolerance) {
    var elementPosition = document.getElementById(element).getBoundingClientRect();
    var elementTop = elementPosition.top;
    var elementBottom = elementPosition.bottom;
    var viewportTop = document.body.scrollTop+tolerance;
    var viewportBottom  = viewportTop + window.innerHeight;
    return elementBottom > viewportTop && elementTop < viewportBottom;
}



//Function to add animation to an element
function addAnimatedClass(element, delay) {
    setTimeout(function() {
        element.classList.remove("not-visible");
        element.classList.add("animated");
        element.classList.add("fadeInRight");
    }, delay);
}

function addAnimation () {
    if (isInViewport("features", 500)) {
        index = 0;
        for (var i = 0; i < arrayToAnimate.length; i++) {
            addAnimatedClass(arrayToAnimate[index], i*500);
            index++;
        }
        event.stopPropagation();
        window.removeEventListener("scroll", addAnimation);
    }
}
window.addEventListener("scroll", addAnimation);

var links = document.querySelectorAll('#navbar  a[href^="#"]');
var menu = document.querySelector('#navbar');

links.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        var targetSelector = link.getAttribute('href');
        var targetElement = document.querySelector(targetSelector);
        window.scroll({
            top: targetElement.offsetTop - menu.offsetHeight,
            behavior: 'smooth'
        });
    });
});


var elements = [];
for (var i = 0; i < links.length; i += 1) {
    elements.push(
        document.querySelector(
            links[i].getAttribute('href')
        )
    )
}


window.addEventListener('scroll', function (event) {
    elements.forEach(function (element, index, allElements) {

        var isActive = false;

        if (isInViewport(element.getAttribute('id'), -500) // Current section is visible with a tolerance of -100 px
            && (typeof elements[index+1] === "undefined" // There is no next section, the current one is the last one
            ||  !isInViewport(elements[index+1].getAttribute('id'), -500) // Or the next section is not visible yet
            )
            && index !==0) { //and it's not the first section (We don't want to add highlight to logo)
            isActive = true;
        }

        if (isActive) {
            links[index].classList.add('active');
        } else {
            links[index].classList.remove('active')
        }
    })

});

window.addEventListener('keydown', function(event){
    if (event.code==='KeyG' || event.code==='KeyA' || event.code==='KeyN') {
        secretKeys.push(event.code.replace("Key", ""));
    }

    if (secretKeys.length===4){
        if ("GANG" === secretKeys.join("")){
            window.location.replace("game.html");
        }
    }

    if(event.code==="KeyG" && secretKeys.length > 2){
        secretKeys = ['G'];
    }
});
