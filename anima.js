window.onresize = function () {
  location.reload();
};
console.log("hello");
const canvas = document.getElementById("canvas_1");
console.log(canvas);
const ctx = canvas.getContext("2d");
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.width = window.innerWidth;
canvas.height = canvas.width / 3;
let textSize = "1.9em";
let particleArray = [];
let xOffSet = 0;
let yOffset = 88;
let rad = canvas.width / 8;

const mouse = {
  x: null,
  y: null,
  radius: rad,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x - xOffSet;
  mouse.y = event.y - yOffset;
  console.log(mouse.x, mouse.y);
});

$(window).resize(function () {});

ctx.fillStyle = "white";
ctx.font = "2.6vw Verdana";
ctx.fillText("Welcome ", 0, canvas.width / 40);
const testCoords = ctx.getImageData(0, 0, 240, 100);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
    this.color = "white";
    this.color2 = this.color;
  }
  draw() {
    ctx.fillStyle = this.color2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / dist;
    let forceDirectionY = dy / dist;
    let maxDistance = mouse.radius;
    let force = (maxDistance - dist) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if (dist < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
      let tone = Math.random() * 230 + 5;
      let tone2 = Math.random() * 230 + 5;
      this.color2 = "rgb(" + tone + ",0," + tone + ",0.7)";
      this.size = 4;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
      if (this.x - this.baseX < 1) {
        this.color2 = this.color;
        this.size = 2;
      }
    }
  }
}
console.log(testCoords);
function init() {
  particleArray = [];
  let filter;
  for (let y = 0, y2 = testCoords.height; y < y2; y++) {
    for (let x = 0, x2 = testCoords.width; x < x2; x++) {
      if (testCoords.data[y * 4 * testCoords.width + x * 4 + 3] > 128) {
        let postionX = x;
        let postionY = y;
        particleArray.push(new Particle(postionX * 8.5, postionY * 10));
      }
    }
  }
}
init();
console.log(particleArray);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  connect();
  requestAnimationFrame(animate);
}
animate();
function connect() {
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 8) {
        ctx.strokeStyle = "green";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}
