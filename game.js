//variables declaration
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

let speed = 10;

let snakeHeadX = 13; 
let snakeHeadY = 12;
let tileCount = 25;
let tileBlock = canvas.width / tileCount;
let tileSize = tileBlock - 2;

let xVelocity = 0;
let yVelocity = 0;

//The game loop
function drawGame() {

    clearScreen();
    changeSnakePosition();
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

function changeSnakePosition() {
    snakeHeadX = snakeHeadX + xVelocity;
    snakeHeadY = snakeHeadY + yVelocity;
  }
  

//Moving snake element (up, down, right & left arrow keys) 
document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
    //up
    if (event.keyCode == 38) {
        xVelocity = 0;
        yVelocity = -1;
    }
  
    //down
    if (event.keyCode == 40) {
        xVelocity = 0;
        yVelocity = 1;
    }
  
    //left
    if (event.keyCode == 37) {
        xVelocity = -1;
        yVelocity = 0;
    }
  
    //right
    if (event.keyCode == 39) {
        xVelocity = 1;
        yVelocity = 0;
  }
}

drawGame();