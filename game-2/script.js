const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
console.log(colorBoxes);

const newRoundBtn = document.querySelector('#newRoundBtn');

const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
const btnTrack = document.querySelector('.color-box-container');

let currentStreak = 0;
let bestStreak = 0;
let pickCorrectColor = "";
let num = 6;
let color = [];

function webLoad() {
    onLoad();
    setGame();
    displayContent();
}

function onLoad() {
    var temp = localStorage.getItem('highBestStreak');
    if (temp != null) {
        bestStreak = temp; // here the localstorage contains the dara so it will return the data not null.
    }
}

function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}

function statusMsg(msg) {
    messageDisplay.textContent = msg;
}

function colorGenerate() {
    const a = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const c = Math.floor(Math.random() * 256);
    return `rgb(${a}, ${b}, ${c})`;
}

function generateColor(num) {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;
}

function pickGenerator() {
    const math = Math.floor(Math.random() * color.length);
    return color[math];
}

function setGame() {
    color = generateColor(num);
    pickCorrectColor = pickGenerator();
    colorDisplay.textContent = pickCorrectColor;
    messageDisplay.textContent = "Pick the correct color!";
    for (let i = 0; i < colorBoxes.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];
    }
}

function trackBtn(event) {
    const element = event.target;
    const rgb = element.style.backgroundColor;

    if (!rgb) return; 

    if (pickCorrectColor === rgb) {
        statusMsg("🎉 Congratulations! You guessed right!");
        currentStreak++;
        displayContent();
        setGame();

        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
            localStorage.setItem('highBestStreak', bestStreak);
        }

        displayContent();

    } else {
        statusMsg("Try again!");
    }
}

function newRound() {
    currentStreak = 0;
    statusMsg("New round started. Pick the color!");
    displayContent();
    setGame();
}


function easyGame() {
    num = 3;
    statusMsg("Easy mode activated!");
    newRound(); 
    displayContent();
    for (let j = 3; j <= 5; j++) {
        colorBoxes[j].style.display = 'none';
    }
}

function hardGame() {
    num = 6;
    statusMsg("Hard mode activated!");
    newRound();
    displayContent();
    for (let j = 0; j < colorBoxes.length; j++) {
        colorBoxes[j].style.display = '';
    }
}

function resetStreak() {
    currentStreak = 0;
    bestStreak = 0;
    localStorage.removeItem('highBestStreak');
    statusMsg("Streaks reset!");
    displayContent();
}


webLoad();

btnTrack.addEventListener('click', trackBtn);
newRoundBtn.addEventListener('click', newRound);
easyBtn.addEventListener('click', easyGame);
hardBtn.addEventListener('click', hardGame);
resetStreakBtn.addEventListener('click', resetStreak);