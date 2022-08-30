//////////////

//array of colours
var buttonColors = ["red", "blue", "green", "yellow"];

//game pattern array will take nextSequenece as input
var gamePattern = [];

//whenever the user will click the button id will be stored here
var userClickedPattern = [];

//game start
var started = false;

//game level
var level = 0;

//to start the game
// $(document).keypress(function(event) {
//     if(event.keyCode === 65 && started === false)
// });
$(document).keypress(function () {
    if (!started) { //'is not' shorthand is !
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



////////////////////



//user actions
$(".btn").click(function () {

    //to store the id of the button that got clicked
    var userChosenColor = $(this).attr("id");

    //to store the userChosencolor in user array
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animateBtn(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});



//game over and reset
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        //when right answer
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        //when wrong answer
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, press any key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}



//game actions
function nextSequence() {

    //refresh game
    userClickedPattern = [];

    //setting level
    level++;
    $("#level-title").text("Level " + level);

    //random number
    var randomNumber = Math.floor(Math.random() * 4);

    //randomly choose colour from array
    var randomChosenColor = buttonColors[randomNumber];

    //adding the seleted colour to game pattern array
    gamePattern.push(randomChosenColor);

    //animate
    animateBtn(randomChosenColor);

    //sound
    playSound(randomChosenColor);

}



//resetting
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


//////////////////////


//animation
function animateBtn(name) {
    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
    // $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
}

//sound
function playSound(name) {
    var beat = new Audio("./sounds/" + name + ".mp3");
    beat.play();
}



