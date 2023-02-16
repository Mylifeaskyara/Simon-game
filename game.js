var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userChlickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started) {
        $('h1').text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userChlickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userChlickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel]===userChlickedPattern[currentLevel]){
        console.log("success");

        if (userChlickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $('h1').text("Game Over, Press Any Key to Restart");

        startOver();
    }
    
}

function nextSequence(){

    userChlickedPattern=[];
    level++;
    $('h1').text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);  
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


