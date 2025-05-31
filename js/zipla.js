const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let boxY = 200;
let velocity = 0;
let gravity = 0.6;
let isJumping = false;
let obstacles = [{ x: 500, width: 30 }];

document.addEventListener("keydown", function (e) {
  if (e.code === "Space" && !isJumping) {
    velocity = -10;
    isJumping = true;
  }
});

function drawBox() {
  ctx.fillStyle = "gold";
  ctx.fillRect(50, boxY, 30, 30);
}

function drawObstacles() {
  ctx.fillStyle = "tomato";
  obstacles.forEach((obs) => {
    ctx.fillRect(obs.x, 230, obs.width, 30);
    obs.x -= 3;

    if (obs.x + obs.width < 0) {
      obs.x = 500 + Math.random() * 200;
    }

    // çarpışma kontrolü
    if (
      50 < obs.x + obs.width &&
      50 + 30 > obs.x &&
      boxY + 30 > 230
    ) {
      alert("Oyun Bitti!");
      document.location.reload();
    }
  });
}

function update() {
  velocity += gravity;
  boxY += velocity;

  if (boxY > 200) {
    boxY = 200;
    velocity = 0;
    isJumping = false;
  }
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBox();
  drawObstacles();
  update();
  requestAnimationFrame(loop);
}

loop();