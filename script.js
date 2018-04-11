// window.addEventListener("hashchange", function () {
//     window.scrollTo(window.scrollX, window.scrollY - 100);
// });

$(document).on('click', 'a', function(event){
    event.preventDefault();
    $('html,body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 800);
});