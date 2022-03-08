//variables declaration
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

let speed = 7;

let snakeHeadX = 13; 
let snakeHeadY = 12;
let tileCount = 25;
let tileBlock = canvas.width / tileCount;
let tileSize = tileBlock - 2;

//The game loop
function drawGame() {

    clearScreen();
    drawSnake();
    setTimeout(drawGame, 1000 / speed);
}

// Clear screen
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

//Snake element
function drawSnake() {
    ctx.fillStyle = "orange";
    ctx.fillRect(snakeHeadX * tileCount, snakeHeadY * tileCount, tileSize, tileSize);
  }

drawGame();