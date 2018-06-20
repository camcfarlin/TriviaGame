window.onload = function(){
	$(".answer").on("click", function(){
		game.selectedAnswer = $(this).text();
		game.reveal();
	});
};
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
    
	numberOfQuestions:6,
	counter: "",
	state: 0,
	timer: 30,
	correctAnswers: 0,
	incorrectAnswers: 0,
	unanswered: 0,
    selectedAnswer: "",
    
	progress:function(){
		game.state++;
		game.resetTimer();
		if(game.state <= game.numberOfQuestions)
		{
            $("#timer, #choiceOne, #choiceTwo, #choiceThree, #choiceFour").show();
			$("#timer").text("Time Remaining: " + game.timer + " seconds");
			game.counter = setInterval(game.count, 1000);
			$("#question").text(game.questions[game.state].question);
			$("#choiceOne").text(game.questions[game.state].answers[0]);
			$("#choiceTwo").text(game.questions[game.state].answers[1]);
			$("#choiceThree").text(game.questions[game.state].answers[2]);
			$("#choiceFour").text(game.questions[game.state].answers[3]);

		}
		else
		{
			$("#question").html('All done, here\'s how you did!<br><h3>Correct Answers: ' + game.correctAnswers+ '<br>Incorrect Answers: '+ game.incorrectAnswers +'<br>Unanswered: ' + game.unanswered + '</h3>');
            $("#choiceOne").show();
            $("#choiceOne").text("Start Over?");
            // need to find a way to remove div, empty div still shows :hover property
            $("#timer, #choiceTwo, #choiceThree, #choiceFour").hide();
			//reset game
			game.state = 0;
			game.incorrectAnswers = 0;
			game.correctAnswers = 0;
			game.unanswered = 0;
		}



	},
	count:function(){
		game.timer--;
		$("#timer").text("Time Remaining: " + game.timer + " seconds");
		if (game.timer == 0)
		 {
		 	game.selectedAnswer = "";
		 	game.reveal();
		 }
    },
    //game time 30 secs
	resetTimer:function(){
		game.timer = 30;
    },
    
    // create a page to relay to user correct or wrong answer 
    // also if time runds out
	reveal:function(){
		if(game.state > 0)
		{
            // if object - correctanswerindex matches users choice ++
			if(game.questions[game.state].answers[game.questions[game.state].correctAnswerIndex] == game.selectedAnswer )
			{
				game.correctAnswers++;
                $("#question").html('Correct!<br><br><br><img src="'+ game.questions[game.state].gifImage +'">');
                $("#timer, #choiceOne, #choiceTwo, #choiceThree, #choiceFour").hide();
            }
            // if unanswered
			else if(game.selectedAnswer == "")
			{
				game.unanswered++;
				$("#question").html('Out of Time!<br><br><h3>The correct answer was: ' + game.questions[game.state].answers[game.questions[game.state].correctAnswerIndex] +'</h3><br><img src="'+ game.questions[game.state].gifImage +'">');
                $("#timer, #choiceOne, #choiceTwo, #choiceThree, #choiceFour").hide();		
            }
            // if object - correctanswerindex does not match users choice, show correct answer
			else
			{
				game.incorrectAnswers++;
				$("#question").html('Nope!<br><br><h3>The correct answer was: ' + game.questions[game.state].answers[game.questions[game.state].correctAnswerIndex]+'</h3><br><img src="'+ game.questions[game.state].gifImage +'">');
                $("#timer, #choiceOne, #choiceTwo, #choiceThree, #choiceFour").hide();		
            }
            // clear
			clearInterval(game.counter);
			setTimeout(game.progress, 4000);
		}
		else
			game.progress();
	}
};

