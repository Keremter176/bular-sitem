const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let aliens = [];
let bullets = [];
let score = 0;

document.addEventListener("keydown", shoot);

function shoot(e) {
  if (e.code === "Space") {
    bullets.push({ x: 240, y: 290 });
  }
}

function spawnAlien() {
  const x = Math.random() * (canvas.width - 40);
  aliens.push({ x: x, y: 0 });
}

function drawAliens() {
  for (let alien of aliens) {
    ctx.fillStyle = "lime";
    ctx.fillRect(alien.x, alien.y, 30, 30);
    alien.y += 2;
  }
}

function drawBullets() {
  for (let bullet of bullets) {
    ctx.fillStyle = "red";
    ctx.fillRect(bullet.x, bullet.y, 5, 10);
    bullet.y -= 5;
  }
}

function checkCollisions() {
  bullets.forEach((b, bi) => {
    aliens.forEach((a, ai) => {
      if (
        b.x < a.x + 30 &&
        b.x + 5 > a.x &&
        b.y < a.y + 30 &&
        b.y + 10 > a.y
      ) {
        bullets.splice(bi, 1);
        aliens.splice(ai, 1);
        score += 10;
        document.getElementById("score").innerText = `Skor: ${score}`;
      }
    });
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAliens();
  drawBullets();
  checkCollisions();
  requestAnimationFrame(draw);
}

setInterval(spawnAlien, 1500);
draw();