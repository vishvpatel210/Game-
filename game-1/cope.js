var currentScore = document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var statusMessage = document.querySelector('#statusMessage');
var resetButton = document.querySelector('#resetButton');
var pauseButton = document.querySelector('#pauseButton');
var name = prompt("Enter your name");
var video_play = document.querySelector('#video1');


var current = 0;
var high = 0;
var timeLeft = 10; // renamed from time1
var track = false;
var idTrack = null;

function loadContent() {
    dataLoad();
    displayMessage();
}

function dataLoad() {
    var temp = localStorage.getItem('highScore');
    if (temp != null) {
        high = parseInt(temp);
    } else {
        high = 0;
    }
}

function displayMessage() {
    currentScore.textContent = current/10;
    highScore.textContent = high;
    timer.textContent = timeLeft; //  correct element
}

function statusMsg(msg) {
    statusMessage.textContent = msg;
}

function endGame() {
    clearInterval(idTrack);
    track = false;
    clickButton.disabled = true;
    startButton.disabled = false;

    if (current > high) {
        localStorage.setItem('highScore', current);
        high = current;
        displayMessage();
        statusMsg("You're current score is higher than previous one.");
        video_play.style.display = "block";
        video_play.play();
         
    }
    else if (current == high) {
        statusMsg("you touched high score.");
    }
    else {
        statusMsg("You're current score is less compared to previous one.");
    }
}

function startGame() {
    track = true;
    current = 0;
    timeLeft = 10; // reset time
    clickButton.disabled = false;
    startButton.disabled = true;
    statusMsg("Game has started!");
    displayMessage();
    video_play.style.display = "none";
        
  

    idTrack = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
        displayMessage();
    }, 1000);
}

function clickMe() {
    
    if (track) {
        current++;
        clickButton.style.transform = 'scale(1.1)'
        if(current > 20){
            currentScore.style.color = 'red';
        }
        // if(current > high){
        //     high++;
        // }
        displayMessage();
    }
}

function resetHighScore() {
    localStorage.removeItem('highScore');
    high = 0;
    current = 0;
    displayMessage();
    statusMsg("High score has been reset");
}

loadContent();

var paused = false;


function pauseMe() {
  if(!paused){
    clickButton.disabled = true;
    clearInterval(idTrack);
    track = false;
    paused = true;
    pauseButton.textContent="resume";
  }  
  else{
    clickButton.disabled = false;
    track = true;
    idTrack = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
        displayMessage();
    }, 1000);
    pauseButton.textContent = "pause"
  }
}


function updatehighscore(){

}



startButton.addEventListener('click', startGame);
clickButton.addEventListener('click', clickMe);
resetButton.addEventListener('click', resetHighScore);

startButton.addEventListener('click', startGame);


clickButton.addEventListener('click', clickMe);
pauseButton.addEventListener('click', pauseMe);

