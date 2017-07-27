var attempts = 0;
var answers = [];
var answer;
var score = 0;
var missed = 0;
var timeLeft = 20;
$(document).ready(function() {
	changeScore();
	changeMissed();
	setTime();
	$("#initiateGame").click(function() {
		console.log("questionMarkerAppear is called");
		$("#initiateGame").remove();
		$.ajax({
          	url: "https://opentdb.com/api.php?amount=50&category=15&difficulty=medium&type=multiple",
          	method: "GET"
        }).done(function(data) {
          	console.log(data);
          	playGame();
			function createQuestion() {
				$("#questionMarker").html(data.results[attempts].question);
			}
			function createAnswerArray() {
				answer = data.results[attempts].correct_answer;
          		answers.push(answer);
          		for (var i = 0; i < data.results[attempts].incorrect_answers.length; i++) {
          			answers.push(data.results[attempts].incorrect_answers[i]);
          		} 
          		function shuffle(answers) {
  					var currentIndex = answers.length, temporaryValue, randomIndex;
  					// While there remain elements to shuffle...
  					while (0 !== currentIndex) {
    					// Pick a remaining element...
    					randomIndex = Math.floor(Math.random() * currentIndex);
    					currentIndex -= 1;
    					// And swap it with the current element.
    					temporaryValue = answers[currentIndex];
    					answers[currentIndex] = answers[randomIndex];
    					answers[randomIndex] = temporaryValue;
  					}
  					return answers;
				}
				answers = shuffle(answers)
			}
			function createAnswerButtons() {
				$(".answer").remove()
				for (var i = 0; i < answers.length; i++) {
					var a = $('<button value="' + answers[i] + '">');
					a.addClass("answer button is-primary is-large is-outlined");
   	 				a.text(answers[i]);
    				$("#questionDisplay").append(a);
				}
			}
			function compareGuess() {
				$(".answer").click( function() {
					guessedButton = $(this).val();
					console.log("yo");
					if(guessedButton === answer) {
						console.log("winner");
						attempts = attempts + 1;
						score = score + 1;
						answers = [];
						timeLeft = 20;
						changeScore();
						replayGame();
					} else {
						missed = missed + 1;
						attempts = attempts + 1;
						answers = [];
						timeLeft = 20;
						changeMissed();
						replayGame();
					}
				});
			}
			function setTime() {
				$("#timer").html(timeLeft);
			}
			function countDown() {
				setInterval(minusSecond, 1000)
			}
			function minusSecond() {
				timeLeft = timeLeft - 1;
				setTime();
				timeEnd();
			}
			function timeEnd() {
				if(timeLeft === 0) {
					missed = missed + 1;
					attempts = attempts + 1;
					answers = [];
					timeLeft = 20;
					changeMissed();
					replayGame();
					console.log("time")
				}
			}
			function playGame() {
				countDown();
				createQuestion();
          		createAnswerArray();
          		createAnswerButtons();
          		compareGuess();
			}
			function replayGame() {
				clear();
				createQuestion();
          		createAnswerArray();
          		createAnswerButtons();
          		compareGuess();
			}
      	});
	});
});
function changeScore() {
	$("#score").html(score);
	console.log("ive changed score")
}
function changeMissed() {
	$("#missed").html(missed);
}
function clear() {
	$("#questionDisplay").empty();
}
function setTime() {
	$("#timer").html(timeLeft);
}
function countDown() {
	setInterval(minusSecond, 1000)
}
function minusSecond() {
	timeLeft = timeLeft - 1;
	setTime();
	timeEnd();
}
function timeEnd() {
	if(timeLeft === 0) {
		missed = missed + 1;
		attempts = attempts + 1;
		answers = [];
		timeLeft = 20;
		changeMissed();
		replayGame();
		console.log("time")
	}
}
