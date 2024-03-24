const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerSize = 20;
const carWidth = 40;
const carHeight = 20;

let playerY = 560;
let playerX = 290;

let score = 1;

let cars = [];

let carSpeed = 2;
let carInterval = 500;
let carTimer;

function drawPlayer() {
  ctx.fillStyle = "black";
  ctx.fillRect(playerX, playerY, playerSize, playerSize);
}

function movePlayer(e) {
  if (e.key === "ArrowUp") {
    playerY -= 20;
    if (playerY < 0) {
      playerY = 560;
      score++;
      carSpeed += 0.2;
      carInterval = Math.max(carInterval - carSpeed * 100, 10);
    }
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Courier";
  ctx.fillText("SCORE: " + score, 10, 30);
}

function drawCar(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, carWidth, carHeight);
}

function generateCars() {
  let carY = Math.floor(Math.random() * (canvas.height - 60));
  let carColor = [
    "#FF5733",
    "#FFBD33",
    "#33FF57",
    "#339CFF",
    "#7A33FF",
    "#9100AA",
  ][Math.floor(Math.random() * 6)];
  cars.push({ x: canvas.width, y: carY, color: carColor });
}

function drawCars() {
  cars.forEach((car) => {
    drawCar(car.x, car.y, car.color);
  });
}

function moveCarsOnRoad() {
  cars.forEach((car) => {
    car.x -= carSpeed;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawCars();
  // setInterval(generateCars, carInterval);
  moveCarsOnRoad();
  // collisionDetection();
  drawScore();
  requestAnimationFrame(draw);
}

document.addEventListener("keydown", movePlayer);

draw();

setInterval(generateCars, carInterval);
