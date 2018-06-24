window.onload = function(){
	$(".answer").on("click", function(){
		game.selectedAnswer = $(this).text();
		reveal();
	});
};

//ajax/json notes- 
// var answerAnswer = [];
// var myObj = [];
// var randomAnswer = [];
// // JSON/AJAX ITEMS 

// var category = "15";
// var queryURL = "https://opentdb.com/api.php?amount=10&category="+category;

// // $.get(queryURL,function(request,response){
// // 	console.log(response);
	
// // }).then(function(data){
// // 	console.log(data);
// // });


// $.ajax({
// 	url: queryURL,
// 	method: "GET"
// 	}).then(function(response_code) {
// 	console.log(response_code)
// 	myObj = response_code.results;
// 	randomAnswer = (response_code.results[0].incorrect_answers.concat(response_code.results[0].correct_answer));
// 	// console.log(randomAnswer)
// 	shuffle (randomAnswer);
// 	});

// function shuffle(a) {
// 	var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
// 		j = Math.floor(Math.random() * (i + 1));
// 		// console.log (i + "=i", j+ "=j",);
// 		x = a[i];
// 		// console.log (x+ "=x", a+ "=a", i+ "=i");
// 		a[i] = a[j];
// 		// console.log (a+ "=a", i+ "=i", j+ "=j");
// 		a[j] = x;
// 		// console.log (i, j, x, a);
//     }
//     // console.log(a);
// }
// // setTimeout(() => {
// // }, 500);
// // console.log (myObj[0].question);
// // var set as objects to be called on


// var set as objects to be called on
var game = {
	questions:[
	{	
		question:"",
		answers:["Press to Start", "" , "" , ""]
	},
	{
	question:"What year was the first edition of Dungeons and Dragons published?",
		answers:["1974", "1983", "1969", "1982"],
		correctAnswerIndex: 1,
		gifImage:"assets/images/dndgif.gif"
	},
	{
		question:"Who is the god orcs worship?",
		answers:["Lolth", "Taimat", "Gruumsh", "Kurtulmak"],
		correctAnswerIndex:2,
		gifImage:"assets/images/orc.gif"
	},
	{
		question:"Whos credited to be one of the creators of Dungeons and Dragons?",
		answers:["Gary Gygax","Tyler Jacobson","R.A. Salavator","Troy Denning"],
		correctAnswerIndex:0,
		gifImage:"assets/images/garyGygax.gif"
	},
	{
		question:"Why was the FBI investigating Dungeons and Dragons players?",
		answers:["Believed they practiced witchraft","DND players had a dragon","Thought they were terrorist","Drug bust"],
		correctAnswerIndex:2,
		gifImage:"assets/images/fbi.gif"
	},
	{
		question:"What moster is commonly known as the eye tyrant?",
		answers:["Golem","Mind Flayer","Beholder","Gnome"],
		correctAnswerIndex:2,
		gifImage:"assets/images/beholder.gif"
	},
	{
		question:"In the 2009 movie Dungeons & Dragons, what did the Rod of Savrille do?",
		answers:["Summon an Undead Army","Control Red Dragon","Call on the aid of Ents","Allow the party to fly on Eagles"],
		correctAnswerIndex:1,
		gifImage:"assets/images/dragon.gif"
    }],
}
	var numberOfQuestions = 6;
	var counter =  "";
	var state = 0;
	var timer = 30;
	var correctAnswers = 0;
	var incorrectAnswers = 0;
	var unanswered = 0;
    var selectedAnswer =  "";
   
	function progress(){
		state++;
		resetTimer();
		if(state <= numberOfQuestions)
		{
            $("#timer, #choiceOne, #choiceTwo, #choiceThree, #choiceFour").show();
			$("#timer").text("Time Remaining: " + timer + " seconds");
			counter = setInterval(count, 1000);
			$("#question").text(game.questions[state].question);
			$("#choiceOne").text(game.questions[state].answers[0]);
			$("#choiceTwo").text(game.questions[state].answers[1]);
			$("#choiceThree").text(game.questions[state].answers[2]);
			$("#choiceFour").text(game.questions[state].answers[3]);

		}
		else
		{
			$("#question").html('All done, here\'s how you did!<br><h3>Correct Answers: ' + correctAnswers+ '<br>Incorrect Answers: '+ incorrectAnswers +'<br>Unanswered: ' + unanswered + '</h3>');
            $("#choiceOne").show();
            $("#choiceOne").text("Start Over?");
            // need to find a way to remove div, empty div still shows :hover property
            $("#timer, #choiceTwo, #choiceThree, #choiceFour").hide();
			//reset game
			state = 0;
			incorrectAnswers = 0;
			correctAnswers = 0;
			unanswered = 0;
		}



	};
	function count(){
		timer--;
		$("#timer").text("Time Remaining: " + timer + " seconds");
		if (timer == 0)
		 {
		 	selectedAnswer = "";
		 	reveal();
		 }
    };
    //game time 30 secs
	function resetTimer(){
		timer = 30;
    };
    
    // create a page to relay to user correct or wrong answer 
    // also if time runds out
	function reveal(){
		if(state > 0)
		{
            // if object - correctanswerindex matches users choice ++
			if(game.questions[state].answers[game.questions[state].correctAnswerIndex] == game.selectedAnswer )
			{
				game.correctAnswers++;
                $("#question").html('Correct!<br><br><br><img src="'+ game.questions[state].gifImage +'">');
                $("#timer, #choiceOne, #choiceTwo, #choiceThree, #choiceFour").hide();
            }
            // if unanswered
			else if(game.selectedAnswer == "")
			{
				game.unanswered++;
				$("#question").html('Out of Time!<br><br><h3>The correct answer was: ' + game.questions[state].answers[game.questions[state].correctAnswerIndex] +'</h3><br><img src="'+ game.questions[state].gifImage +'">');
                $("#timer, #choiceOne, #choiceTwo, #choiceThree, #choiceFour").hide();		
            }
            // if object - correctanswerindex does not match users choice, show correct answer
			else
			{
				game.incorrectAnswers++;
				$("#question").html('Nope!<br><br><h3>The correct answer was: ' + game.questions[state].answers[game.questions[state].correctAnswerIndex]+'</h3><br><img src="'+ game.questions[state].gifImage +'">');
                $("#timer, #choiceOne, #choiceTwo, #choiceThree, #choiceFour").hide();		
            }
            // clear
			clearInterval(counter);
			setTimeout(progress, 4000);
		}
		else
			progress();
	};