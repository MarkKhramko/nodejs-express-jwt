module.exports = {
  'GET /status': 'APIController.getStatus',

  'POST /auth/register': 'UserController.register',
  'POST /auth/login': 'UserController.login',
  'POST /auth/validate': 'UserController.validate'
};
