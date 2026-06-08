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
 * Check if at least one document element is missing.
 */
function checkDocElements() {
    if (gameDisplay === null | winnerDisplay === null | playButton === button | rock === null | paper === null | scissors === null) {
        throw new error ("One or more document element is missing.")
    }
}

/**
 * Sets up starting screen where player can press the play button to begin the game.
 */
function startScreen() {
    gameDisplay.textContent = "Ready?";

    playButton.style.display = "block";
    playButton.textContent = "Play!";
    playButton.addEventListener("click", startCountdown, {once: true});

    rock.style.display = "none";
    paper.style.display = "none";
    scissors.style.display = "none";

    winnerDisplay.textContent = "";
}

/**
 * Displays the words "Rock!", "Paper!", "Scissors!", "Shoot!", one at a time before starting the game.
 */
async function startCountdown() {
    playButton.style.display = "none'";

    let countdownIndex = 0;

    while (countdownIndex < WORDS.length) {
        const word = WORDS[countdownIndex];
        if (word === undefined) {
            throw new Error("Countdown word is undefined");
        }
        gameDisplay.textContent = word;
        countdownIndex++;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // display next word after 1 second
    }
}