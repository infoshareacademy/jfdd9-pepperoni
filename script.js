var buttonNode = document.getElementById('subscribe');

// window.addEventListener("hashchange", function () {
//     window.scrollTo(window.scrollX, window.scrollY - 100);
// });


var elementsToAnimate = document.getElementsByClassName("feature-description");
var arrayToAnimate = [].slice.call(elementsToAnimate);


//Function to check if an element is in viewport. As an argument, pass the id of the element you want to check.
function isInViewport(element) {
    var elementPosition = document.getElementById(element).getBoundingClientRect();
    var elementTop = elementPosition.top;
    var elementBottom = elementPosition.bottom;
    var viewportTop = document.body.scrollTop+500;
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
    if (isInViewport("features")) {
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