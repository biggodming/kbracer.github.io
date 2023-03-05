var x = isPhone();
if (!x) {
  const mouse = {
    x: 0,
    y: 0
  } // 检测鼠标
  const pos = {
    x: 0,
    y: 0
  } // 鼠标跟踪

  document
    .querySelector('body')
    .addEventListener('mousemove', ({
      x,
      y
    }) => {
      mouse.x = x
      mouse.y = y
    })

  requestAnimationFrame(function movement() {
    const easting = 10
    pos.x += (mouse.x - pos.x) / easting
    pos.y += (mouse.y - pos.y) / easting
    const xValue = calcValue(pos.x, window.innerWidth)
    const yValue = calcValue(pos.y, window.innerHeight)

    document.querySelector(
      '#media-layer-view'
    ).style.transform = `translate3d(${xValue}px, ${yValue}px, 0) rotateX(${-yValue}deg) rotateY(${xValue}deg)`
    document.querySelector('#media-layer-front').style.transform = `translate3d(${
    xValue * 7.7
  }px, ${yValue * 3}px, 50px) rotateX(${-yValue}deg) rotateY(${
    xValue
  }deg)`

    requestAnimationFrame(movement)
  })

  function calcValue(a, b) {
    const range = 20
    return (a / b) * range - range / 2
  }
}