const WORDS = ["Rock!", "Paper!", "Scissors!", "Shoot!"];

let playerChoice = null;

// HTML Document Elements
const gameDisplay = document.getElementById("game-display");
const winnerDisplay = document.getElementById("winner-display");
const playButton = document.getElementById("play-button");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const rockText = document.getElementById("rock-text");
const paperText = document.getElementById("paper-text");
const scissorsText = document.getElementById("scissors-text");
const rockImg = document.getElementById("rock-img");
const paperImg = document.getElementById("paper-img");
const scissorsImg = document.getElementById("scissors-img");

// Links to images of moves
const rockLink= "assets/rock.png";
const paperLink = "assets/paper.png";
const scissorsLink = "assets/scissors.png";

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
    if (gameDisplay === null || winnerDisplay === null || playButton === null || rock === null || paper === null || scissors === null || rockText === null || paperText === null || scissorsText === null || rockImg === null || paperImg === null || scissorsImg === null) {
        throw new Error("One or more document element is missing.")
    }
}

/**
 * Sets up starting screen where player can press the play button to begin the game.
 */
function startScreen() {
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
    gameDisplay.style.visibility = "visible";
    playButton.style.visibility = "hidden";

    rock.style.visibility = "hidden";
    paper.style.visibility = "hidden";
    scissors.style.visibility = "hidden";

    winnerDisplay.textContent = "";

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
    rockText.textContent = "rock";
    rockImg.src = rockLink;
    rock.style.pointerEvents = "auto";

    paper.style.visibility = "visible";
    paperText.textContent = "paper";
    paperImg.style.visibility = "visible";
    paperImg.style.height = "50px";
    paperImg.style.width = "50px";
    paper.style.pointerEvents = "auto";

    scissors.style.visibility = "visible";
    scissorsText.textContent = "scissors";
    scissorsImg.src = scissorsLink;
    scissors.style.pointerEvents = "auto";

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
 * 
 * @param {*} move The player or computer's move.
 * @returns The link to the image representing that move.
 */
function getMoveImg(move) {
    if (move === "rock") {
        return rockLink;
    } else if (move === "paper") {
        return paperLink;
    }

    return scissorsLink;
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
    rockText.textContent = playerMove;
    rockImg.src = getMoveImg(playerMove);
    rock.style.pointerEvents = "none";

    paperText.textContent = "vs.";
    paperImg.style.visibility = "hidden";
    paperImg.style.height = "0px";
    paperImg.style.width = "0px";
    paper.style.pointerEvents = "none";

    scissorsText.textContent = computerMove;
    scissorsImg.src = getMoveImg(computerMove);
    scissors.style.pointerEvents = "none";

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
    playAgain();
}

/**
 * 
 */
function playAgain() {
    playButton.style.visibility = "visible";
    playButton.textContent = "Play again?";
    playButton.addEventListener("click", startCountdown, {once: true});
}

startScreen();
