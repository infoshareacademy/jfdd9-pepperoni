var buttonNode = document.getElementById('subscribe')

// window.addEventListener("hashchange", function () {
//     window.scrollTo(window.scrollX, window.scrollY - 100);
// });


var elementsToAnimate = document.getElementsByClassName("feature-description");
var arrayToAnimate = [].slice.call(elementsToAnimate);


function isInViewport() {
    var featuresPosition = document.getElementById("features").getBoundingClientRect();
    var featuresTop = featuresPosition.top;
    var featuresBottom = featuresPosition.bottom;
    var viewportTop = document.body.scrollTop+500;
    var viewportBottom  = viewportTop + window.innerHeight;
    return featuresBottom > viewportTop && featuresTop < viewportBottom;
}

function addAnimatedClass(element, delay) {
    setTimeout(function() {
        element.classList.remove("not-visible");
        element.classList.add("animated");
        element.classList.add("fadeInRight");
    }, delay);
}

function addAnimation () {
    if (isInViewport()) {
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
