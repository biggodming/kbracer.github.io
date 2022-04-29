var boxer = document.getElementById("search-bar")
var scroll = function (e) {
    e = e || window.event;
    if (e.wheelDelta) {
        if (e.wheelDelta > 50) {
            boxer.style['margin-top'] = 60 + "px"
        }
        if (e.wheelDelta < 50) {
            boxer.style['margin-top'] = -30 + "px"
        }
    } else if (e.detail) {
        if (e.detail > 50) {
            boxer.style['margin-top'] = 60 + "px"
        }
        if (e.detail < 50) {
            boxer.style['margin-top'] = -30 + "px"
        }
    }
}
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scroll, false);
}
window.onmousewheel = window.onmousewheel = scroll;