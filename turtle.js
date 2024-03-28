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

let gameOverFlag = false;

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
      carInterval = Math.max(carInterval - carSpeed * 10, 100);
      clearTimeout(carTimer);
      carTimer = setTimeout(generateCars, carInterval);
    }
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Courier";
  ctx.textAlign = "left";
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
  carTimer = setTimeout(generateCars, carInterval);
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

function gameOver() {
  ctx.fillStyle = "black";
  ctx.font = "bold 40px Courier";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  clearInterval(carTimer);
  document.getElementById("startBtn").style.display = "block";
  gameOverFlag = true;
}

function collisionDetection() {
  cars.forEach((car) => {
    if (
      playerX < car.x + carWidth &&
      playerX + playerSize > car.x &&
      playerY < car.y + carHeight &&
      playerY + playerSize > car.y
    ) {
      gameOver();
      saveData(score);
    }
  });
}

function startAgain() {
  gameOverFlag = false;
  score = 1;
  cars = [];
  carSpeed = 2;
  playerY = 560;
  document.getElementById("startBtn").style.display = "none";
  draw();
  generateCars();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawCars();
  moveCarsOnRoad();
  collisionDetection();
  drawScore();

  if (!gameOverFlag) {
    requestAnimationFrame(draw);
  }
}
document.addEventListener("keyup", movePlayer);

draw();

generateCars();

let json = [];

function loadData() {
  const jsonString = localStorage.getItem("Score");
  if (jsonString) {
    json = JSON.parse(jsonString);
  }
}

loadData();
// localStorage.clear();

function saveData(score) {
  console.log(score);
  const jsonData = {
    score: score,
  };
  json.push(jsonData);

  const jsonString = JSON.stringify(json);

  localStorage.setItem("Score", jsonString);
}

let value = [];
document.addEventListener("DOMContentLoaded", function () {
  function retrieveData() {
    if (localStorage.getItem("Score")) {
      let data = JSON.parse(localStorage.getItem("Score"));
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        value.push(data[i].score);
      }
      value.sort(function (a, b) {
        return a - b;
      });
      // console.log(value);

      const minValue = value.slice(0, 3);
      const maxValue = value.slice(-3);

      document.getElementById("min-value").textContent = minValue;
      document.getElementById("max-value").textContent = maxValue;
    } else {
      document.getElementById("min-value").textContent =
        "No data found in storage.";
    }
  }

  document.getElementById("save").addEventListener("click", retrieveData);
});
