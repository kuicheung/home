var controllers = require('../app/controllers');

module.exports = function(app){
	//console.log(controllers);
	app.get('/', controllers.home);
	/*app.get('/admin', controllers.admin.home);
	app.get('/admin/questions', controllers.admin.questions);
	app.get('/admin/users', controllers.admin.users);
	app.get('/admin/users/remove/:id', controllers.admin.removeUser);
	app.get('/user/create', controllers.user.create);	
	app.get('/user/find/:username', controllers.user.find);
	app.get('/question/createQuestions', controllers.question.createQuestions);
	app.get('/question/all', controllers.question.findAll);
	app.get('/question/remove/:id', controllers.question.remove);*/
};