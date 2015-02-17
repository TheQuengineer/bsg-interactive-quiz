$(document).ready(function () {
	//Defining Question Object
	function Question (question) {
		this.question = question[0];
		this.pointValue = question[1];
		this.answer = question[2];
		this.answers = question[3];

		this.element = $('<li></li>');
	}

	Question.prototype.render = function () {
		this.element.text(this.question)
		for (var i = 0; this.answers.length; i++) {
			this.element.append('<input type="radio"' + escapeHtml(this.answers[i]));
		}

		return this;	
	}

	Question.prototype.isSubmitted = function () {
		var checked = this.getAnswer();
		if (checked == null ) {

		}
		return checked != null;
	}


	Question.prototype.getPoints = function () {
		var answer = this.getAnswer();

		return answer === this.answer ? this.pointValue : 0;
	}

	Question.prototype.getAnswer = function () {
		return // use JQUERY to capture input of :checked Items
	}

	function Quiz (questions) {
		this.element = $('<ol></ol>');

		this.questions = questions.map(function(question) {
			return new Question(this, question)
		},this)
	}

	Quiz.prototype.render = function () {
		this.questions.forEach(function(question) {
			this.element.append(question.render().el)
		}, this)
		return this;
	}

    Quiz.prototype.submit = function () {
       // check everything is submitted, then tally guesses
       
       var total = this.questions.reduce(function (sum, question) {
        return sum + question.getPoints()
       }, 0)
    }


    $('.quiz').append(new Quiz([
    	['How many Humans Survived the brutal Attack from the cyclons?',2,1,['47,900','50,000','144,000','10 million']],
    	['What was the initial Birth Place for the Human Race?', 5, 3,['Earth','Caprica','Sagittaron','Kobol']],
  		['How many sons did Captain Adama Have?', 1, 0,['two','one','three','none']],
  		['What was the name of the President prior to the attack by the Cyclons?', 10, 2,['Franklin Cheers','Gaius Baltar','Ricard Ador','Laura Roslin']],
  		["What was Laura Roslin's position in the governemnt prior to the attacks?", 5, 1,['Minister of Defense','Secretary of Education','Secretary of Treasury','Vice President']],
  		["How many cylons did Michell reveal were hiding on the BattleStar Galactica amongst the humans?", 10, 2,['12','5', '8','3']],
  		["How many seasons did Battle Star Galactica Air for?", 1, 2,['1','12','4','3']],
  		["What artifact did Laura Roslin send Starbuck to find which cost her jail time?", 10, 2,['The Constituion','The tomb of Athena','Arrow of Apollo','The Cyclons Sacred map']],
  		["What is the name of the Cylon that Gaius Baltar constantly has visions of?", 5, 1, ['83','Number 6','Michell','Starbuck']],
  		["Which of the Human Colonies were considered to be the center of colonial civilization?", 10, 1,['Sagittaron','Caprica','Scorpoa','Virgon']]
    ]).render().el)
});