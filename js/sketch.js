const finishPopupTitleElem = document.querySelector('.js-finish-popup-title')


//  РАЗМЕРЫ КАНВАСА
const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight - document.querySelector('footer').offsetHeight - document.querySelector('header').offsetHeight

function setup() {
  // let myCanvas = createCanvas(windowWidth, windowHeight);
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  myCanvas.parent("canvas");
}

// function windowResized() {
//   const canvasWidth = window.innerWidth
//   const canvasHeight = window.innerHeight - document.querySelector('footer').offsetHeight - document.querySelector('header').offsetHeight
//   resizeCanvas(canvasWidth, canvasHeight);
// }

var startGame = false

function draw() {
  background(255);

  //   ПОДЛОЖКА КОНВЕЙЕРА
  noStroke()
  fill('#FFD482')
  rect(marginArea.width, marginArea.height, linesArea.width, linesArea.height)

  //   ЛИНИИ
  stroke('#CC952A')
  strokeCap(SQUARE)
  strokeWeight(4)

  if (startGame == false) {
    return
  }

  lines.forEach(lineItem => {
    line(lineItem.x, lineItem.y1, lineItem.x, lineItem.y2)
    if (lineItem.x >= canvasWidth - marginArea.width) {
      lineItem.x = lineItem.x - linesArea.width
    } else {
      lineItem.x = lineItem.x + speed
    }
  })

  //   ЭЛЕМЕНТЫ
  noStroke()
  items.forEach(circleItem => {
    fill(circleItem.color)
    circle(circleItem.x, circleItem.y, circleItem.rad)
    circleItem.x = circleItem.x + speed
  })

  //   СЧЕТЧИК
  fill(0)
  textAlign(CENTER, CENTER);
  textSize(32);
  text('Аквабаллы: ' + pointCounter, canvasWidth / 2, marginArea.height / 2)
  // text('Speed: ' + speed.toFixed(1), canvasWidth / 2, marginArea.height * 1.5 + linesArea.height)
  text('Пропущено: ' + missedItems.length + '/15', canvasWidth / 2, marginArea.height * 1.5 + linesArea.height)
}

// РАНДОМНОЕ ЧИСЛО
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// КОНВЕЙЕР
let speed = 1.5
const linesArea = {
  width: canvasWidth,
  height: 300,
}
const marginArea = {
  width: (canvasWidth - linesArea.width) / 2,
  height: (canvasHeight - linesArea.height) / 2
}
const linesCount = 12
const linesGutter = linesArea.width / linesCount
let lines = []
for (let i = 0; i < linesCount; i++) {
  lines.push({
    x: i * linesGutter + marginArea.width,
    y1: marginArea.height,
    y2: linesArea.height + marginArea.height
  })
}

// ЭЛЕМЕНТЫ НА КОНВЕЙЕРЕ
let items = []
let timerId = setInterval(() => {
  if (startGame) {
    createCircles()
  }
}, 600 / speed)

const red = '#F64445'
const white = '#FFFFFF'
const yellow = '#FFD749'
const blue = '#3263BF'
const pink = '#FDD0E3'
const green = '#4FB25B'
const lightblue = '#83D0FB'

let colors = [pink, white, lightblue, red, blue, green]

let missedItems = []

function createCircles() {
  items.push({
    x: -100,
    y: getRandom(marginArea.height + 20, linesArea.height + marginArea.height - 30),
    rad: getRandom(70, 90),
    color: random(colors)
  })

  missedItems = items.filter(item => item.x > canvasWidth + 100);
  if (missedItems.length >= 15) {
    speed = 0
    let finalPopup = document.querySelector('.wrapper__promo__popup.finish')
    finalPopup.style.display = 'flex'
    finishPopupTitleElem.innerHTML = 'вуху, вы выиграли ' + pointCounter + ' аквабалл(ов)'
    // popup.style.display = 'block'
  }
}

//   СЧЕТЧИК
let pointCounter = 0

function mousePressed() {
  items.forEach((circleItem, index) => {
    if (dist(mouseX, mouseY, circleItem.x, circleItem.y) < circleItem.rad / 2) {
      items.splice(index, 1)
      pointCounter++;
    }
  })
  if (pointCounter % 5 == 0 & pointCounter !== 0) {
    speed = speed + 0.3

    clearInterval(timerId)
    timerId = setInterval(() => {
      createCircles()
    }, 600 / speed)
  }
}