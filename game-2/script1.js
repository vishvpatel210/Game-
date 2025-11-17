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
const roundNew = document.querySelector('.control-btn');

var currentStreak = 0;
var bestStreak = 0;
var pickCorrectColor = 0;
var num = 6;
var color = [];

function webLoad(){
onLoad();
setGame();
displayContent();
}

//whenever the website will load then first it will load the entire data....
function onLoad(){
    var temp = localStorage.getItem('highBestStreak');
    if(temp != null){
        bestStreak = temp; // here the localstorage contains the dara so it will return the data not null.
    }
    else{
        bestStreak = 0; //if there is no data in localstorage so it wil return null instead of number.
    }
}

// here we will define the display content message in a funcion format....
function displayContent(){
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}
function statusMsg(msg) {
    messageDisplay.textContent = msg;
}
//random color generator
function colorGenerate(){
    var a = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var c = Math.floor(Math.random()*256);
    return`rgb(${a}, ${b}, ${c})`;
}

function generateColor(num){
    const arr = [];
    for(var i =0 ; i<num ; i++){
    arr.push(colorGenerate());
    }
return arr;
}

function pickGenerator(){
    const math = Math.floor(Math.random()*color.length);
    return color[math];
}

function setGame() {
    color = generateColor(num);
    pickCorrectColor = pickGenerator();
    console.log(color);
    console.log(pickCorrectColor);
    colorDisplay.textContent = pickCorrectColor;
    for(var i = 0; i < color.length; i++){
        colorBoxes[i].style.backgroundColor = color[i];
    }
}


webLoad();
function trackBtn(event){
    var element = event.target;
    console.log(element);
    var rgb = element.style.backgroundColor;
    console.log(rgb);
    if(pickCorrectColor === rgb){
        statusMsg("Congratulation 🎉🎉  You Win the Game");
        bestStreak++;
        localStorage.setItem('best streak', bestStreak);
        
        currentScore++;
        displayContent();
    }
    else{
        statusMsg("Try again");
    }
}

function newRound(){
    currentStreak = 0;
    statusMsg("new round has been started pick the color");
    displayContent();
}

roundNew.addEventListener('click',newRound);
btnTrack.addEventListener('click',trackBtn); //agar ham event listner ko parent element mai lagaye to trackBtn kr baad ()argument nahi lagana