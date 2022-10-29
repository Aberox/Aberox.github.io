var h2 = document.querySelector('h2');

setTimeout(function () {
    h2.setAttribute("style", "color: black;opacity:0.5");

}, 1000)

// document.onclick = function () {
//     window.open("首页.htMl", "_self")
// }
document.onkeydown = function () {
    window.open("首页.htMl", "_blank")
}

