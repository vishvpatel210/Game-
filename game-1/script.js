var currentScore =document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickbutton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var statusButton = document.querySelector('#statusMessage');

var current = 0; //user -> button clicked -> data store(click me);
var high = 0; //highscore -> track rakh sake....
var time1= 10; //time -> update...
var track = false;
var idTrack = null;

function loadContent(){
    dataLoad();
    displayMessage();

};

function dataLoad(){
    var temp = localStorage.getItem('highScore');  //pehli baar local storage -> return null otherwise -> data;
    if(temp !=null){
        high = parseInt(temp);  //explicity type conversion
    }
    else{
        high= 0;
    }
};

function displayMessage(){
    currentScore.textContent=current;
    highScore.textContent = high;
    timer.textContent = time1;
};

function statuMsg(msg){
    statusMessage.textContent = msg ;
}
function endGame(){
    clearInterval(idTrack);
    track=false;
    clickbutton.disabled = true;
    timer.textContent=time1;
    if(current > high){
        localStorage.setItem('highscore',current);
        high = current; 
        displayMessage();
        statusMessage("you're current score is higher than previous one");
    }
    else if(current= high){
        statuMsg("you touched high score.")
    }
    else{
        statuMsg("you're current score is less compare to previous one");
    }
}
function startGame(){
    time1=10;
    track = true;
    clickbutton.disabled = false;
    statuMsg("Game is started");
    timer.textContent = time1;
    idTrack=setInterval(function(){
        time1--;
        if(time1<=0){
            endGame();
            

        }
    } ,1000);

        displayMessage();
        

}

function clickMe(){
    if(track){
        current++;
        displayMessage();
    }
}

loadContent();




startButton.addEventListener('click',startGame);
clickbutton.addEventListener('click',clickMe);