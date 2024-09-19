// Facades.
const usersFacade = require('#facades/users');


module.exports = {
	run:_run
}

async function _run () {
	try {
		const exampleUserData = {
			email:    'test@test.com',
			password: 'simplepass'
		}

		await usersFacade.register(exampleUserData);

		return Promise.resolve();
	}
	catch(error) {
		return Promise.reject(error);
	}
}
