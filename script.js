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

// window.addEventListener("hashchange", function () {
//     window.scrollTo(window.scrollX, window.scrollY - 100);
// });

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

window.addEventListener('scroll', function (event) {
    var currentPosition = window.pageYOffset;
    var elements = []
    console.log(links);
    for (var i = 0; i < links.length; i += 1) {
        elements.push(
            document.querySelector(
                links[i].getAttribute('href')
            )
        )
    }
    console.log(elements)

    elements.forEach(function (element, index, allElements) {
        if (
            currentPosition > element.offsetTop &&
            currentPosition < element.offsetHeight + element.offsetTop) {
            links[index].classList.add('active')
        } else {
            links[index].classList.remove('active')
        }
    })

});
