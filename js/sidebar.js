var container = document.getElementById("sidebar")
var gate = document.getElementById("navbar-gate")
gate.onclick = function() {
    if (container.offsetLeft == 0) {
        container.style['margin-left'] = -182 + "px"
    } else {
        container.style['margin-left'] = 0 + "px"
    }
}