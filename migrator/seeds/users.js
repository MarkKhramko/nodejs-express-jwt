// Facades.
const usersFacade = require('#facades/users');


module.exports = {
	run:_run
}

async function _run () {
	try {
		const exampleUserData = {
			email:"test@test.com",
			password:"simplepass"
		}

		const user = await usersFacade.register(exampleUserData);
	}
	catch(error) {
		return Promise.reject(error);
	}
}
