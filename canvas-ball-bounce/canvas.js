const canvas = document.querySelector('#canvas')
const body = document.querySelector('body')

const c = canvas.getContext('2d')

canvas.width = innerWidth 
canvas.height = innerHeight

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

const mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', (event) => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

const maxRadious = 40
const minRadious = 10

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
    this.minRadious = radious
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
    if (this.x + this.radious > innerWidth || this.x - this.radious < 0) {
      this.speedX = -this.speedX
    }
  
    if (this.y + this.radious > innerHeight || this.y - this.radious < 0) {
      this.speedY = -this.speedY
    }
  
    this.x += this.speedX
    this.y += this.speedY

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
        && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radious < maxRadious) {
        this.radious++
      }
    } else if (this.radious > this.minRadious) {
      this.radious -= 1
    }

  }
}

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colorArry = [
  '#1B4965',
  '#62B6CB',
  '#BEE9E8',
  '#CAE9FF',
  '#5FA8D3'
]

let circleArray = []
const init = () => {
  circleArray = []
  for (let i = 0; i < 200; i++) {
    let speedY = (Math.random() - 0.5) * 3
    let speedX = (Math.random() - 0.5) * 3
    const radious = getRandomNumber(10, 20)
    let y = Math.random() * (innerHeight - radious * 2) + radious
    let x = Math.random() * (innerWidth - radious * 2) + radious
    color = colorArry[Math.floor(Math.random() * colorArry.length)]
  
    circleArray.push(new Circle({ x, y, radious, speedX, speedY, color }))
  }

  animate()
}



const animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  circleArray.forEach(circle => {
    circle.draw()
    circle.update()
  })

}

init()