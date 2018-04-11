window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 100);
});

var featuresSection = document.getElementById("features");
var featuresPosition = document.getElementById("features").getBoundingClientRect();


function myFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 50) {
        document.getElementById("features").className = "animated bounceOutLeft";
    } else {
        document.getElementById("features").className = "animated bounceOutLeft";
    }
}



// window.addEventListener("scroll", function () {
//     alert("Hello");
//
//
//     if (featuresSection.scrollTop > featuresPosition.top) {
//         alert("Hello");
//     }
// });
//
//
// console.log(featuresPosition.top, featuresPosition.right, featuresPosition.bottom, featuresPosition.left);