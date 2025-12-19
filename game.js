const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 200, y: 200 }];
let food = randomFood();
let direction = "RIGHT";
let score = 0;
let game;

document.addEventListener("keydown", changeDirection);

function randomFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
}

function changeDirection(e) {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.forEach((part, i) => {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(part.x, part.y, box, box);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };

  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // їжа
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFood();

    if (score === 19) {
      clearInterval(game);
      document.getElementById("reward").classList.remove("hidden");
      return;
    }
  } else {
    snake.pop();
  }

  // зіткнення
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.some(p => p.x === head.x && p.y === head.y)
  ) {
    clearInterval(game);
    alert("Гру закінчено");
    return;
  }

  snake.unshift(head);
}

game = setInterval(draw, 120);