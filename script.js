const WORDS = ["Rock!", "Paper!", "Scissors!", "Shoot!"];

let playerChoice = null;

// HTML Document Elements
const gameDisplay = document.getElementById("game-display");
const winnerDisplay = document.getElementById("winner-display");
const playButton = document.getElementById("play-button");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

// Rock Paper Scissors moves and the moves they beat.
const MOVES = new Map([
    ["rock", ["scissors"]],
    ["paper", ["rock"]],
    ["scissors", ["paper"]],
]);

/**
 * Sets up starting screen where player can press the play button to begin the game.
 */
function startScreen() {
    gameDisplay.textContent = "Ready?";

    playButton.style.display = "block";
    playButton.textContent = "Play!";
    playButton.addEventListener("click", startCountdonw, {once: true});

    rock.style.display = "none";
    paper.style.display = "none";
    scissors.style.display = "none";

    winnerDisplay.textContent = "";
}