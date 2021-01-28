// Reference models.
const User = require('#models/User');
// JWT service.
const JWT = require('#services/jwt.service');
// Password hash and compare service.
const bcryptService = require('#services/bcrypt.service');
// Custom error.
const Err = require('#factories/error');


module.exports = {
	register: _register,
	login: _login,
	getFullName: _getFullName
}

async function _register({ email, password }) {
	try{
		// Try to create new user.
		const user = await User.create({
			email,
			password
		});

		// Define JWT payload.
		const payload = { id: user.id };
		// Issue new JWT.
		const token = JWT.issue(payload);

		// Prepare output.
		const result = [
			token,
			user
		];
		return Promise.resolve(result);
	}
	catch(error){
		return Promise.reject(error);
	}
}

async function _login({ email, password }) {
	try{
		// Try to find user.
		const user = await User.findOneByEmail(email);

		if (!user) {
			// If no such user was found, throw error with name UserNotFound:
			const err = new Err('User not found');
			err.name = "UserNotFound";
			throw err;
		}

		if (!bcryptService.comparePasswords(password, user.password)) {
			// Validation failed,
			// throw custom error with name Unauthorized:
			const err = new Err(`Validation failed.`);
			err.name = "ValidationError";
			throw err;
		}

		// If passwords matched, issue new token.
		const token = JWT.issue({ id: user.id });

		// Prepare output.
		const result = [
			token,
			user
		];
		return Promise.resolve(result);
	}
	catch(error){
		return Promise.reject(error);
	}
}

async function _getFullName({ userId }) {
	try{
		// Try to find user.
		const user = await User.findById(userId);

		if (!user) {
			// If no such user was found, throw error with name UserNotFound:
			const err = new Err('User not found');
			err.name = "UserNotFound";
			throw err;
		}

		const fullName = user.fullName();

		// Prepare output.
		const result = [ fullName ];
		return Promise.resolve(result);
	}
	catch(error){
		return Promise.reject(error);
	}
}