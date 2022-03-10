//variables declaration
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");

let speed = 7;

let tileCount = 25;
let tileBlock = canvas.width / tileCount; //using this so that the code does't break in case canvas size changes
let tileSize = tileBlock - 2;
let snakeHeadX = 13;
let snakeHeadY = 12;
const snakeParts = [];
let tailLength = 2;

let foodX = 5;
let foodY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;
let gameLevel = 1;

//adding sound effect
const eatingSound = new Audio("eating_sound.mp3");
const shockSound = new Audio("shock_sound.mp3");

//The game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }
    clearScreen();
    checkFoodCollision();
    drawFood();
    drawSnake();
    drawScore();
    drawGameLevel();

    if (score > 9) {
        speed = 11;
    }
    if (score > 19) {
        speed = 14;
    }
    if (score > 29) {
        speed = 17;
    }
    if (score > 39) {
        speed = 19;
    }
    if (score > 49) {
        speed = 21;
    }
    if (score > 59) {
        speed = 20;
    }
    if (score > 69) {
        speed = 18;
    }
    if (score > 69) {
        speed = 16;
    }
    if (score > 99) {
        speed = 10;
    }

    setTimeout(drawGame, 1000 / speed);
}

// Clear screen
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Score card
function drawScore() {
    ctx.fillStyle = "greenyellow";
    ctx.font = "16px Verdana";
    ctx.fillText("Score: " + score, canvas.width - 90, 20);
}

//Snake element
function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(
            part.x * tileBlock,
            part.y * tileBlock,
            tileSize,
            tileSize
        );
    }

    snakeParts.push(new SnakePart(snakeHeadX, snakeHeadY)); //put an item at the end of the list next to the snake head
    if (snakeParts.length > tailLength) {
        snakeParts.shift(); // remove the furthet item from the snake parts if we have more than our tail size.
    }

    //snake head
    ctx.fillStyle = "orange";
    ctx.fillRect(
        snakeHeadX * tileBlock,
        snakeHeadY * tileBlock,
        tileSize,
        tileSize
    );
}

function changeSnakePosition() {
    snakeHeadX = snakeHeadX + xVelocity;
    snakeHeadY = snakeHeadY + yVelocity;
}

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// food element
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(foodX * tileBlock, foodY * tileBlock, tileSize, tileSize);
}
function checkFoodCollision() {
    if (foodX === snakeHeadX && foodY === snakeHeadY) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        eatingSound.play();
    }
}

//Implementing conditions to determine how the game will end (collision detection)
function isGameOver() {
    let gameOver = false;
    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }
    //walls
    if (snakeHeadX < 0) {
        gameOver = true;
        shockSound.play();
    } else if (snakeHeadX === tileBlock) {
        gameOver = true;
        shockSound.play();
    } else if (snakeHeadY < 0) {
        gameOver = true;
        shockSound.play();
    } else if (snakeHeadY === tileBlock) {
        gameOver = true;
        shockSound.play();
    }

    // Snake running into itself
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === snakeHeadX && part.y === snakeHeadY) {
            gameOver = true;
            shockSound.play();
            break;
        }
    }

    //Display game over message
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "70px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0.25", "greenyellow");
        gradient.addColorStop("1.0", "red");

        // Fill with gradient
        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width / 5, canvas.height / 2);
    }

    return gameOver;
}

//Moving snake element (up, down, right & left arrow keys)
document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
    //up
    if (event.keyCode == 38) {
        if (yVelocity == 1) return;
        xVelocity = 0;
        yVelocity = -1;
    }

    //down
    if (event.keyCode == 40) {
        if (yVelocity == -1) return;
        xVelocity = 0;
        yVelocity = 1;
    }

    //left
    if (event.keyCode == 37) {
        if (xVelocity == 1) return;
        xVelocity = -1;
        yVelocity = 0;
    }

    //right
    if (event.keyCode == 39) {
        if (xVelocity == -1) return;
        xVelocity = 1;
        yVelocity = 0;
    }
}

drawGame();
