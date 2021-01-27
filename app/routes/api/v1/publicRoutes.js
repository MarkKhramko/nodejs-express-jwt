module.exports = {
	'GET /status': 'APIController.getStatus',

	'POST /auth/register': 'UsersController.register',
	'POST /auth/login': 'UsersController.login',
	'POST /auth/validate': 'UsersController.validate'
};
