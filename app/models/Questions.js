
var _ = require('lodash');

/*var schema = db.Schema({
	text: String,
	answer: String,
	topic: String,
	picUrl: String
});
schema.statics.findAll = function (cb) {
	  this.find({},cb);
};
	
var questionDB = db.model('Question',schema);

var Question = function(text,answer,topic){
	if(text)
		this.text = text;
	if(answer)
		this.answer = answer;
	if(topic)
		this.topic = topic;

};

var questions = [];
var currentQuestion = 0;

exports.createQuestions = function (cb){
	var question = null;
	questions.push(question = new questionDB({text:"This is a test question?",answer:"answer",topic:'IQ'}));
	question.save();
	questions.push(question = new questionDB({text:"This is another test question?",answer:"question",topic:'Trivial'}));
	question.save();
	questions.push(question = new questionDB({text:"This is a question?",answer:"cat",topic:'IQ'}));
	question.save();
	questions.push(question = new questionDB({text:"What is a test question?",answer:"dog",topic:"Current Events"}));
	question.save();
	cb(questions);
};

exports.findAll = function(page,cb){
	console.log('find all:');
	questionDB.findAll(page,cb);
};

exports.remove = function(id,cb){
	questionDB.remove({_id:id},cb);
};

var nextQuestion = function(next){
	if(++currentQuestion == questions.length)
		currentQuestion = 0;
	questions[currentQuestion].startTime = new Date().getTime();
	next(true);
};

var loadQuestions = function(cb){
	questionDB.findAll(function(err,data){
		for(var i=0;i<data.length;i++){
			questions.push(new Question(data[i].text,data[i].answer,data[i].topic));
		}
		questions[0].startTime = new Date().getTime();		
		cb(questions);
	});
};


exports.getCurrentQuestion = function(callback){
	if(questions.length<1)
		loadQuestions(function(questions){			
			callback(questions[currentQuestion]);
		});
	else
		callback(questions[currentQuestion]);
};

exports.checkAnswer = function(answer,next){
	if(answer == questions[currentQuestion].answer){
		nextQuestion(next);
	}
	else
		next(false);
	return this;
};*/
