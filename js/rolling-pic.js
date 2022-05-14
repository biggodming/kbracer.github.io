var url = "../json/banner.json";
var request = new XMLHttpRequest();
let carouselList = [];
request.open("get", url);
request.send();
request.onload = function () {
  if (request.status == 200) {
    carouselList = JSON.parse(request.responseText);
  }

  for (let i = 0; i < carouselList.length; i++) {
    carouselList[i].thumbnail = `img/banner/banner_${i + 1}.webp`
  }
  /**
   * 初始化轮播
   */
  carouselList.forEach((item, index) => {
    document.querySelector('#media-list').innerHTML += `
  <div 
    class="media-list-item"
    data-index="${index}"
    data-serial="${item.serial}"
    data-title="${item.title}"
    data-desc="${item.desc}"
    data-thumbnail="${item.thumbnail}"
  >
    <div 
      class="media-list-item-img" 
      style="background-image: url(${item.thumbnail})"
      data-title="${item.title}"
    ></div>
  </div>
  `
    document.querySelector('#media-layer-front .media-nav-wrapper').innerHTML += `
  <div
    class="media-nav-item"
    active="${index === 0 ? true : false}"
    data-index="${index}"
    data-serial="${item.serial}"
    data-title="${item.title}"
    data-desc="${item.desc}"
    data-thumbnail="${item.thumbnail}"
  ></div>
  `
  })

  var activeIndex = 0 // 初始化激活的索引
  const layerFront = document.querySelector('#media-layer-front')
  const mediaSerial = layerFront.querySelector('.media-info-serial')
  const mediaTitle = layerFront.querySelector('.media-info-title')
  const mediaDetail = layerFront.querySelector('.media-info-detail')
  const mediaMainPic = document.querySelector('#media-layer-view .media-main-pic')
  const mediaLink = mediaMainPic.querySelector('.media-link')
  const mediaImage = mediaLink.querySelector('.media-img')
  const mediaList = document.querySelector('#media-list')

  // 初始化咨询
  mediaImage.style = `background-image: url(${carouselList[0].thumbnail}); transform-origin: left top; transform: scale(1)`
  mediaLink.href = `https://www.bilibili.com/video/${carouselList[0].bvlink}`
  mediaSerial.innerHTML = carouselList[0].serial
  mediaTitle.innerHTML = carouselList[0].title
  mediaDetail.innerHTML = carouselList[0].desc

  /**
   * 设定间隔、点击事件
   */
  for (let i = 0; i < carouselList.length; i++) {
    let mediaItem = mediaList.querySelector(
      `.media-list-item:nth-child(${i + 1})`
    )
    let navItem = layerFront.querySelector(`.media-nav-item:nth-child(${i + 1})`)

    const mediaListItem = mediaList.querySelector(`.media-list-item:nth-child(1)`)
    const mediaListItemWidth = getComputedStyle(mediaListItem).width.replace(
      'px',
      ''
    )
    let mediaListItemPaddingRight = getComputedStyle(
      mediaListItem
    ).paddingRight.replace('px', '')

    // 计算x位移之宽度 = media-list-item 的 width + 左右padding
    let xWidth = (
      parseFloat(mediaListItemWidth) +
      parseFloat(mediaListItemPaddingRight) * 2
    ).toFixed(0)

    // 只显示前四张图片
    if (i <= 3) {
      mediaItem.style.transform = `translateX(${xWidth * i}px)`
      mediaItem.style.opacity = 1
    } else {
      mediaItem.style.transform = `translateX(${xWidth * 3}px)`
      mediaItem.style.opacity = 0
      mediaItem.style.pointerEvents = 'none'
    }

    // 轮播列表 轮播指示标 添加点击处理器
    let array = [mediaItem, navItem]
    array.forEach((item) => {
      item.addEventListener('click', () => {
        if (parseInt(item.dataset.index) > parseInt(activeIndex)) {
          carouselItemSwitching(i, 'left')
        } else if (parseInt(item.dataset.index) < parseInt(activeIndex)) {
          carouselItemSwitching(i, 'right')
        }
        activeIndex = item.dataset.index
      })
    })
  }

  /**
   * 左右箭头click事件
   */
  const arrowBtnPrev = document.querySelector('#left-arrow')
  const arrowBtnNext = document.querySelector('#right-arrow')

  arrowBtnPrev.addEventListener('click', () => {
    activeIndex > 0 ? activeIndex-- : (activeIndex = carouselList.length - 1)
    carouselItemSwitching(activeIndex, 'right')
  })

  arrowBtnNext.addEventListener('click', () => {
    activeIndex < carouselList.length - 1 ? activeIndex++ : (activeIndex = 0)
    carouselItemSwitching(activeIndex, 'left')
  })

  /**
   * 自动切换
   */
  var timer;
  const minilist=document.querySelector('.media-nav-wrapper')
  timer = setInterval(autoturn, 5000);

  function autoturn() {
    activeIndex < carouselList.length - 1 ? activeIndex++ : (activeIndex = 0)
    carouselItemSwitching(activeIndex, 'left')
  }

  minilist.addEventListener('mouseover',() =>{
    clearInterval(timer)
  })

  mediaList.addEventListener('mouseover',() =>{
    clearInterval(timer)
  })

  mediaImage.addEventListener('mouseover',() =>{
    clearInterval(timer)
  })

  arrowBtnNext.addEventListener('mouseover',() =>{
    clearInterval(timer)
  })

  arrowBtnPrev.addEventListener('mouseover',() =>{
    clearInterval(timer)
  })

  minilist.addEventListener('mouseout',() =>{
    timer = setInterval(autoturn, 5000);
  })

  mediaList.addEventListener('mouseout',() =>{
    timer = setInterval(autoturn, 5000);
  })

  mediaImage.addEventListener('mouseout',() =>{
    timer = setInterval(autoturn, 5000);
  })

  arrowBtnNext.addEventListener('mouseout',() =>{
    timer = setInterval(autoturn, 5000);
  })

  arrowBtnPrev.addEventListener('mouseout',() =>{
    timer = setInterval(autoturn, 5000);
  })

  /**
   * 轮播切换
   * @param {number} index 激活的索引
   * @param {string} direction 方向 (1.'left', 2.'right')
   */
  function carouselItemSwitching(index, direction) {
    // 清空旧激活状态
    for (let i = 0; i < carouselList.length; i++) {
      layerFront
        .querySelector(`.media-nav-item:nth-child(${i + 1})`)
        .setAttribute('active', false)
    }
    // 激活当前选中的指示标
    layerFront
      .querySelector(`.media-nav-item:nth-child(${index + 1})`)
      .setAttribute('active', true)

    imageZoom(0.25, direction, carouselList[index].thumbnail)
    slideInText(mediaSerial, direction, 0.2, 0.4, carouselList[index].serial)
    slideInText(mediaTitle, direction, 0.2, 0.5, carouselList[index].title)
    slideInText(mediaDetail, direction, 0.2, 0.6, carouselList[index].desc)
    setSlidePosition(index)
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  /**
   * 文字动画
   * @param {HTMLElement} element 要套用的HTML元素
   * @param {string} direction 方向 (1.'left', 2.'right')
   * @param {number} duration 持续
   * @param {number} delay 延迟
   * @param {string} newText 内容
   */
  async function slideInText(element, direction, duration, delay, newText) {
    let a
    if (direction === 'left') {
      a = -50
    } else if (direction === 'right') {
      a = 50
    }
    element.style.transition = `${duration}s ease-out`

    await sleep(delay * 1000)
    element.style.opacity = `0`
    element.style.transform = `translateX(${a}%)`
    await sleep(duration * 1000)
    element.style.transform = `translateX(${-a}%)`
    element.style.opacity = `0`
    await sleep(duration * 1000)
    element.innerHTML = newText
    element.style.transform = `translateX(0)`
    element.style.opacity = `1`
    await sleep(delay * 1000)
  }

  /**
   * 图片切换动画
   * @param {number} duration 持续
   * @param {string} direction 方向 (1.'left', 2.'right')
   * @param {string} newUrl 切换后图片
   */
  async function imageZoom(duration, direction, newUrl) {
    let oldImgTransformOrigin
    let newImgTransformOrigin
    if (direction === 'left') {
      oldImgTransformOrigin = 'left top'
      newImgTransformOrigin = 'right bottom'
    } else if (direction === 'right') {
      oldImgTransformOrigin = 'right bottom'
      newImgTransformOrigin = 'left top'
    }

    mediaLink.innerHTML += mediaLink.innerHTML
    const mediaOldImg = mediaLink.querySelector('.media-img:nth-child(1)')
    const mediaNewImg = mediaLink.querySelector('.media-img:nth-child(2)')
    mediaNewImg.style.backgroundImage = `url(${newUrl})`

    mediaOldImg.style.transformOrigin = oldImgTransformOrigin
    mediaOldImg.style.transform = 'scale(1)'
    mediaOldImg.style.transition = `${duration}s`

    mediaNewImg.style.transformOrigin = newImgTransformOrigin
    mediaNewImg.style.transform = 'scale(0)'
    mediaNewImg.style.transition = `${duration}s`

    await sleep(duration * 1000)
    mediaOldImg.style.transform = 'scale(0)'
    mediaNewImg.style.transform = 'scale(1)'
    await sleep(duration * 1000)
    mediaLink.innerHTML = mediaNewImg.outerHTML
  }

  function setSlidePosition(activeIndex) {
    for (let i = 0; i < carouselList.length; i++) {
      let mediaItem = mediaList.querySelector(
        `.media-list-item:nth-child(${i + 1})`
      )

      const mediaListItem = mediaList.querySelector(
        `.media-list-item:nth-child(1)`
      )
      const mediaListItemWidth = getComputedStyle(mediaListItem).width.replace(
        'px',
        ''
      )
      let mediaListItemPaddingRight = getComputedStyle(
        mediaListItem
      ).paddingRight.replace('px', '')

      // 计算x位移宽度 = media-list-item 的 width + 左右padding
      let xWidth = (
        parseFloat(mediaListItemWidth) +
        parseFloat(mediaListItemPaddingRight) * 2
      ).toFixed(0)

      let xPosition = xWidth * i - xWidth * (activeIndex - 1)

      if (xPosition <= -xWidth) {
        mediaItem.style.transform = `translateX(${-xWidth}px)`
        mediaItem.style.opacity = 0
        mediaItem.style.pointerEvents = 'none'
      } else if (xPosition >= xWidth * 4) {
        mediaItem.style.transform = `translateX(${xWidth * 4}px)`
        mediaItem.style.opacity = 0
        mediaItem.style.pointerEvents = 'none'
      } else {
        mediaItem.style.transform = `translateX(${
        xWidth * i - xWidth * (activeIndex - 1)
      }px)`
        mediaItem.style.opacity = 1
        mediaItem.style.pointerEvents = 'auto'
      }

      if (activeIndex === 0) {
        for (let j = 0; j < 2; j++) {
          mediaList.querySelector(
            `.media-list-item:nth-child(${carouselList.length - j})`
          ).style.transform = `translateX(${xWidth * -j}px)`
          mediaList.querySelector(
            `.media-list-item:nth-child(${carouselList.length})`
          ).style.opacity = 1
          mediaList.querySelector(
            `.media-list-item:nth-child(${carouselList.length})`
          ).style.pointerEvents = 'auto'
        }
      }

      if (activeIndex === 1) {
        for (let j = 0; j < 2; j++) {
          mediaList.querySelector(
            `.media-list-item:nth-child(${carouselList.length - j})`
          ).style.transform = `translateX(${-xWidth}px)`
          mediaList.querySelector(
            `.media-list-item:nth-child(${carouselList.length - j})`
          ).style.opacity = 0
          mediaList.querySelector(
            `.media-list-item:nth-child(${carouselList.length - j})`
          ).style.pointerEvents = 'none'
        }
      }

      if (activeIndex >= carouselList.length - 3) {
        for (let j = 0; j < 3; j++) {
          mediaList.querySelector(
            `.media-list-item:nth-child(${j + 1})`
          ).style.transform = `translateX(${xWidth * 4}px)`
          mediaList.querySelector(
            `.media-list-item:nth-child(2)`
          ).style.opacity = 0
          mediaList.querySelector(
            `.media-list-item:nth-child(2)`
          ).style.pointerEvents = 'none'
        }
      }

      if (activeIndex >= carouselList.length - 2) {
        let a = activeIndex % 3
        for (let j = 0; j < 2; j++) {
          mediaList.querySelector(
            `.media-list-item:nth-child(${j + 1})`
          ).style.transform = `translateX(${xWidth * (4 - a + j)}px)`
        }

        if (activeIndex === carouselList.length - 2) {
          mediaList.querySelector(
            `.media-list-item:nth-child(1)`
          ).style.opacity = 1
          mediaList.querySelector(
            `.media-list-item:nth-child(1)`
          ).style.pointerEvents = 'auto'
        }

        if (activeIndex === carouselList.length - 1) {
          mediaList.querySelector(
            `.media-list-item:nth-child(1)`
          ).style.opacity = 1
          mediaList.querySelector(
            `.media-list-item:nth-child(2)`
          ).style.opacity = 1
          mediaList.querySelector(
            `.media-list-item:nth-child(1)`
          ).style.pointerEvents = 'auto'
          mediaList.querySelector(
            `.media-list-item:nth-child(2)`
          ).style.pointerEvents = 'auto'
        }
      }
    }
  }
}