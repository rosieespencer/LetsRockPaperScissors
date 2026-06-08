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
    playButton.style.display = "none";

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

    displayMoves();
    setupInputListeners();
}

/**
 * Displays the button for the player to select a move.
 */
function displayMoves() {
    rock.style.display = "block";
    rock.textContent = "Rock";

    paper.style.display = "block";
    paper.textContent = "Paper";

    scissors.style.display = "block";
    scissors.textContent = "Scissors";

    winnerDisplay.textContent = "Select your move.";
}

/**
 * Setup event listeners for the move buttons.
 */
function setupInputListeners() {
    rock.addEventListener("click", () => playerChoice = "rock");
    paper.actionEventListener("click", () => playerChoice = "paper");
    scissors.actionEventListener("click", () => playerChoice = "scissors");
}

/**
 * Waits until the player has selected a move.
 * 
 * @returns The player's chosen move.
 */
async function waitForPlayerMove() {
    playerChoice = null;

    while (!playerChoice) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // check if player has selected move
    }

    return playerChoice;
}

/**
 * Selects a move for the computer. 
 * 
 * @returns The computer's move.
 */
function getComputerMove() {
    const randomIndex = Math.floor(Math.random() * MOVES.size);
    const moves = [MOVES.keys()];
    const move = moves[randomIndex];
    
    if (!move) {
        throw new Error("Computer move is undefined.");
    }

    return move;
}

startScreen();
