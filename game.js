//variables declaration
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

let speed = 7;

let snakeHeadX = 13; 
let snakeHeadY = 12;
let tileCount = 25;
let tileBlock = canvas.width / tileCount;
let tileSize = tileBlock - 2;

let foodX = 5;
let foodY = 5;

let xVelocity = 0;
let yVelocity = 0;

//The game loop
function drawGame() {

    clearScreen();
    drawSnake();
    changeSnakePosition();
    drawFood();
    checkFoodCollision();
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
    ctx.fillRect(snakeHeadX * tileBlock, snakeHeadY * tileBlock, tileSize, tileSize);
  }

function changeSnakePosition() {
    snakeHeadX = snakeHeadX + xVelocity;
    snakeHeadY = snakeHeadY + yVelocity;
  }
  
// food element
function drawFood(){
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileBlock, foodY * tileBlock, tileSize, tileSize);
}

//collision detection
function checkFoodCollision(){
    if(foodX === snakeHeadX && foodY === snakeHeadY){
        foodX = Math.floor(Math.random()*tileCount)
        foodY = Math.floor(Math.random()*tileCount)
    }
}

//Moving snake element (up, down, right & left arrow keys) 
document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
    //up
    if (event.keyCode == 38) {
        if(yVelocity == 1) return;
        xVelocity = 0;
        yVelocity = -1;
    }
  
    //down
    if (event.keyCode == 40) {
        if(yVelocity == -1) return;
        xVelocity = 0;
        yVelocity = 1;
    }
  
    //left
    if (event.keyCode == 37) {
        if(xVelocity == 1) return;
        xVelocity = -1;
        yVelocity = 0;
    }
  
    //right
    if (event.keyCode == 39) {
        if(xVelocity == -1) return;
        xVelocity = 1;
        yVelocity = 0;
  }
}

drawGame();