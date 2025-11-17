// ========================================
// DOM Element Selection
// ========================================

// Score elements
const currentScoreDisplay = document.querySelector('#currentScore');
const highScoreDisplay = document.querySelector('#highScore');

// Timer element
const timerDisplay = document.querySelector('#timer');

// Button elements
const clickButton = document.querySelector('#clickButton');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const pauseButton = document.querySelector('#pauseButton');
const resumeButton = document.querySelector('#resumeButton');
var video_play = document.querySelector('#video_play');



// Status message element
const statusMessage = document.querySelector('#statusMessage');


// ========================================
// Game Variables
// ========================================

let currentScore = 0;        // Tracks clicks in current game
let highScore = 0;           // Stores all-time best score
let timeRemaining = 10;      // Countdown timer (10 seconds)
let gameTimerId = null;      // Stores setInterval ID for game timer
let isGameActive = false;    // Tracks if game is currently running
let size = 1;

// ========================================
// Initialize Game on Page Load
// ========================================

// Load high score from localStorage when page loads
function initializeGame() {
    loadHighScore();
    updateDisplay();
}


// ========================================
// localStorage Functions
// ========================================

// Load high score from browser storage
function loadHighScore() {
    const savedHighScore = localStorage.getItem('clickGameHighScore');

    // If high score exists in storage, use it; otherwise default to 0
    if (savedHighScore !== null) {
        highScore = parseInt(savedHighScore);
    } else {
        highScore = 0;
    }
}

// Save high score to browser storage
function saveHighScore() {
    localStorage.setItem('clickGameHighScore', currentScore);
    highScore = currentScore;
}


// ========================================
// Display Update Functions
// ========================================

// Update all display elements
function updateDisplay() {
    currentScoreDisplay.innerText = currentScore;
    highScoreDisplay.innerText = highScore;
    timerDisplay.innerText = timeRemaining;

    if (currentScore > 20) {
        currentScoreDisplay.style.color = 'red';
    }
}

// Update status message
function updateStatus(message) {
    statusMessage.innerText = message;
}


// ========================================
// Game Logic Functions
// ========================================

// Start the game
function startGame() {
    // Reset game state
    currentScore = 0;
    timeRemaining = 10;
    isGameActive = true;

    // Enable click button
    clickButton.disabled = false;
    startButton.disabled = true;
    pauseButton.disabled = false;

    // Update displays
    updateDisplay();
    updateStatus('Game in progress... Click fast!');

    // Start countdown timer
    gameTimerId = setInterval(function () {
        timeRemaining--;
        updateDisplay();

        // Check if time is up
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000); // Run every 1000ms (1 second)


    "click me!"
    setTimeout(() =>{
        clickButton.innerText = "";
    },1000)
}

// End the game
function endGame() {
    // Stop timer
    clearInterval(gameTimerId);
    gameTimerId = null;
    isGameActive = false;
    pauseButton.disabled = true;

    // Disable click button
    clickButton.disabled = true;
    startButton.disabled = false;

    // Check if new high score
    if (currentScore > highScore) {
        saveHighScore();
        updateStatus(`🎉 New High Score: ${currentScore}! Amazing!`);
        document.body.style.background ='gold';


        video_play.style.display = "block";
        video_play.play();
    }
    else if (highScore == currentScore) {
        updateStatus('your curreny score is equal to previous high score')
    }

    else {
        updateStatus(`Game Over! Your score: ${currentScore}`);
    }

    clickButton.style.transform = 'scale(1)';


    clickButton.innerText="click me!";

    var cps = currentScore/10;
    statusMessage.innerHTML =` you clicked ${cps} timer per second`

    startButton.innerHTML = "play again";


    setTimeout(() =>{
        document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
    },1000)

    updateDisplay();
}

// Handle click button press
function handleClick() {
    if (isGameActive) {
        currentScore++;

        updateDisplay();
    }
    if (size <= 2) {
        clickButton.style.transform = scale(`${size}`);
        size = size + 0.1;
    }
};



function pauseme() {
    // stop the timer
    clearInterval(gameTimerId);
    gameTimerId = null;
    isGameActive = false;

    clickButton.disabled = true;

    // hide Pause button and show Resume button
    pauseButton.style.display = 'none';
    resumeButton.style.display = 'inline-block';

    updateStatus('Game paused. Click Resume to continue!');
}


function resumeme() {
    // resume game only if paused
    if (!isGameActive && timeRemaining > 0) {
        isGameActive = true;
        clickButton.disabled = false;

        // hide Resume and show Pause again
        resumeButton.style.display = 'none';
        pauseButton.style.display = 'inline-block';

        updateStatus('Game resumed! Keep clicking!');

        // restart timer
        gameTimerId = setInterval(function () {
            timeRemaining--;
            updateDisplay();

            if (timeRemaining <= 0) {
                endGame();
            }

        }, 1000);
    }
}



// Reset high score
function resetHighScore() {
    const confirmed = confirm('Are you sure you want to reset your high score?');

    if (confirmed) {
        localStorage.removeItem('clickGameHighScore');
        highScore = 0;
        currentScore = 0;

        updateDisplay();
        updateStatus('High score has been reset!');
    }
}


// ========================================
// Event Listeners
// ========================================

// Click button - increment score
clickButton.addEventListener('click', handleClick);

// Start button - begin new game
startButton.addEventListener('click', startGame);

// Reset button - clear high score
resetButton.addEventListener('click', resetHighScore);

// pause button - current score resume and time stop 
pauseButton.addEventListener('click', pauseme);

// resume button - pause ko chalu karne ke liye 
resumeButton.addEventListener('click', resumeme);


// ========================================
// Initialize on Page Load
// ========================================

initializeGame();