var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed").delay(100).queue(function(next) {
    $("." + currentColour).removeClass("pressed");
    next();
  });
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  level = level + 1;
  $('#level-title').text("Level " + level);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  console.log("gamePattern: " + gamePattern);
}

function gameOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
  console.log("LOST");
}

function startOver() {
  gameOn = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer() {
  var len = userClickedPattern.length;
  var checkGamePattern = gamePattern.slice(0, len);
  if (len === gamePattern.length) {
    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } else {
      gameOver();
    }
  } else if (JSON.stringify(userClickedPattern) !== JSON.stringify(checkGamePattern)) {
    gameOver();
  }
}

$(".btn").click(function(e) {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();

  console.log("userClickedPattern: " + userClickedPattern);
});

$(document).keydown(function() {
  if (gameOn === false) {
    gameOn = true;
    nextSequence();
    console.log("Game Started");
  }
});
