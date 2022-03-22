const canvas = document.querySelector('#canvas')

const windowWidth = window.innerWidth - 50
const windowHeight = window.innerHeight - 50

canvas.width = windowWidth
canvas.height = windowHeight

const c = canvas.getContext('2d')

// c.fillStyle = '#f87a3a'
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = '#c89af3'
// c.fillRect(500, 100, 100, 100)
// c.fillStyle = '#9ca2bc'
// c.fillRect(300, 300, 100, 100)


//line
// c.beginPath()
// c.moveTo(50, 300)
// c.lineTo(300, 100)
// c.lineTo(400, 300)
// c.strokeStyle = '#fa34a3'
// c.stroke()

// arc / circle
// for (let i = 0; i < 100; i++) {
//   const x = Math.random() * window.innerWidth
//   const y = Math.random() * window.innerHeight
//   c.beginPath()
//   c.arc(x, y, 30, 0, Math.PI * 2, false)
//   c.strokeStyle = 'blue'
//   c.stroke()
// }

class Circle {
  constructor ({
    x,
    y,
    radious,
    speedX,
    speedY,
    color
  }) {
    this.x = x
    this.y = y
    this.radious = radious
    this.speedX = speedX
    this.speedY = speedY
    this.color = color
  }

  draw () {
    c.beginPath()
    c.arc(this.x, this.y, this.radious, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
  }

  update () {
    if (this.x + this.radious > windowWidth || this.x - this.radious < 0) {
      this.speedX = -this.speedX
    }
  
    if (this.y + this.radious > windowHeight || this.y - this.radious < 0) {
      this.speedY = -this.speedY
    }
  
    this.x += this.speedX
    this.y += this.speedY
  }
}

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const circleArray = []

for (let i = 0; i < 1000; i++) {
  let speedY = (Math.random() - 0.5) * 10
  let speedX = (Math.random() - 0.5) * 10
  const radious = getRandomNumber(1, 10)
  let y = Math.random() * (windowHeight - radious * 2) + radious
  let x = Math.random() * (windowWidth - radious * 2) + radious
  color = `#${getRandomNumber(0, 16777215).toString(16)}`

  circleArray.push(new Circle({ x, y, radious, speedX, speedY, color }))
}


const animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  circleArray.forEach(circle => {
    circle.draw()
    circle.update()
  })

}

animate()