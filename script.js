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
