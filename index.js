var color=["red","green","blue","yellow"];
var pattern=[];
var userClickedPattern=[];
var started=false;
var level="0";


$(document).keypress(function(){
    if(!started){
        
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});


var nextSequence=()=>{

    userClickedPattern=[];

    level++;

    $("#level-title").text("Level   "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = color[randomNumber];

    pattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);
}

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)
});

var playSound=function(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}

var animatePress=function(currColor){

    $("#"+currColor).addClass("pressed");
    setTimeout(()=>{
        $("#"+currColor).removeClass("pressed");
    },100)

}

var checkAnswer=function(currlevel){
    if(pattern[currlevel]==userClickedPattern[currlevel])
        {
            if(pattern.length==userClickedPattern.length)
            {
                setTimeout(function(){
                    nextSequence()
                },1000);
            }
        }
    else
        {
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}

var startOver=function(){
    started=false;
    level=0;
    pattern=[];
}

