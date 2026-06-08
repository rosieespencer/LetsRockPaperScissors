const WORDS = ["Rock!", "Paper!", "Scissors!", "Shoot!"];

let playerChoice = null;

// HTML Document Elements
const gameDisplay = document.getElementById("game-display");
const winnerDisplay = document.getElementById("winner-display");
const playButton = document.getElementById("play-button");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");

/**
 * The valid moves in the game and the moves they beat.
 * A move may not both beat and be beaten by another move.
 */
const MOVES = new Map([
    ["rock", ["scissors"]],
    ["paper", ["rock"]],
    ["scissors", ["paper"]],
]);

/**
 * Check if at least one document element is missing.
 */
function checkDocElements() {
    if (gameDisplay === null || winnerDisplay === null || playButton === null || rock === null || paper === null || scissors === null) {
        throw new Error("One or more document element is missing.")
    }
}

/**
 * Sets up starting screen where player can press the play button to begin the game.
 */
function startScreen() {
    gameDisplay.style.visibility = "visible";
    gameDisplay.textContent = "Ready?";

    playButton.style.visibility = "visible";
    playButton.textContent = "Play";
    playButton.addEventListener("click", startCountdown, {once: true});

    rock.style.visibility = "hidden";
    paper.style.visibility = "hidden";
    scissors.style.visibility = "hidden";

    winnerDisplay.textContent = "";
}

/**
 * Displays the words "Rock!", "Paper!", "Scissors!", "Shoot!", one at a time before starting the game.
 */
async function startCountdown() {
    playButton.style.visibility = "hidden";

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
    rock.style.visibility = "visible";
    paper.style.visibility = "visible";
    scissors.style.visibility = "visible";

    winnerDisplay.textContent = "Select your move.";

    playAndDisplayOutcome();
}

/**
 * Setup event listeners for the move buttons.
 */
function setupInputListeners() {
    rock.addEventListener("click", () => playerChoice = "rock");
    paper.addEventListener("click", () => playerChoice = "paper");
    scissors.addEventListener("click", () => playerChoice = "scissors");
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
    const moves = Array.from(MOVES.keys());
    const move = moves[randomIndex];
    
    if (!move) {
        throw new Error("Computer move is undefined.");
    }

    return move;
}

/**
 * Determine whether the player's move beats the computer's move.
 * 
 * @param {*} playerMove 
 * @param {*} computerMove 
 * @returns True if the player's move beats the computer's move, false otherwise.
 */
function checkBeats(playerMove, computerMove) {
    const beats = MOVES.get(playerMove); // the moves the player's move beats

    if (!beats) {
        throw new Error(`The moves ${playerMove} beats have not been defined.`)
    }

    return beats.includes(computerMove);
}

/**
 * Get the player and computer moves and determine the winner.
 * 
 * @returns The string to display who has won the game.
 */
async function play() {
    const playerMove = await waitForPlayerMove();

    winnerDisplay.textContent = "";

    const computerMove = getComputerMove();

    // Display the move selected by the player and the computer
    rock.textContent = playerMove;
    paper.textContent = "vs.";
    scissors.textContent = computerMove;

    if (playerMove === computerMove) {
        return "It's a tie!";
    } else if (checkBeats(playerMove, computerMove)) {
        return "You win!";
    }

    return "The computer wins!";
}

/**
 * Plays the game then displays the outcome.
 */
async function playAndDisplayOutcome() {
    winnerDisplay.textContent = await play();
    gameDisplay.style.visibility = "hidden";
}

startScreen();
