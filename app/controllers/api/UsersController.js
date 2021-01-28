// Reference models.
const User = require('#models/User');

// JWT service.
const JWT = require('#services/jwt.service');
// Password hash and compare service.
const bcryptService = require('#services/bcrypt.service');

// Reponse protocols.
const { 
	createOKResponse,
	createErrorResponse
} = require('#services/responses/api');


const _processError = (error, req, res) => {
	// Default error message.
	let errorMessage = error?.message ?? 'Internal server error';
	// Default HTTP status code.
	let statusCode = 500;

	if (error.name === 'ValidationError'){
		errorMessage = "Invalid email OR password input";
		statusCode = 402;
	}
	else if (error.name === 'Unauthorized') {
		errorMessage = 'Email or password are incorrect.';
		statusCode = 406;
	}
	else if (error.name === 'UserNotFound'){
		errorMessage = "Such user doesn't exist";
		statusCode = 400;
	}
	else if (error.name === 'InvalidToken') {
		errorMessage = 'Invalid token';
		statusCode = 401;
	}
	// Perform your process here...

	return createErrorResponse({
		res, 
		error: {
			message: errorMessage
		},
		status: statusCode
	});
};

const UsersController = () => {
	const _register = async (req, res) => {
		try{
			// Extract request input.
			const data = {
				email: req.body?.email,
				password: req.body?.password,
			};

			// Try to create new user.
			const user = await User.create(data);
			// Issue new JWT.
			const token = JWT.issue({ id: user.id });

			return createOKResponse({
				res, 
				content:{
					token,
					user
				}
			});
		}
		catch(error){
			console.error("UsersController._register error: ", { error });
			return _processError(error, req, res);
		}
	};

	const _login = async (req, res) => {
		try{
			// Extract request input.
			const { 
				email,
				password
			} = req.body;

			if (!email || email === undefined || !password || password === undefined) {
				// If bad input, throw ValidationError:
				const err = new Error("Invalid email OR password input");
				err.name = "ValidationError";
				throw err;
			}

			// Try to find user.
			const user = await User.findOneByEmail(email);

			if (!user) {
				// If no such user was found, throw error with name UserNotFound:
				const err = new Error('User not found');
				err.name = "UserNotFound";
				throw err;
			}

			if (bcryptService.comparePasswords(password, user.password)) {
				// If passwords matched, issue new token.
				const token = JWT.issue({ id: user.id });

				return createOKResponse({
					res, 
					content:{
						token,
						user
					}
				});
			}

			// Validation failed,
			// throw custom error with name Unauthorized:
			const err = new Error(`Validation failed.`);
			err.name = "Unauthorized";
			throw err;
		}
		catch(error){
			console.error("UsersController._login error: ", error);
			return _processError(error, req, res);
		}
	};

	const _validate = async (req, res) => {
		try{
			const { token } = req.body;

			// Validate token against local seed.
			await JWT.verify(token);

			// Everything's fine, send response.
			return createOKResponse({
				res,
				content:{
					isValid: true,
					message: "Valid Token"
				}
			});
		}
		catch(error){
			// In any error case, we send token not valid:
			// Create custom error with name InvalidToken.
			const err = new Error('Invalid Token!');
			err.name = "InvalidToken";
			return _processError(err, req, res);
		}
	};

	const _getAll = async (req, res) => {
		try{
			// Select all users from DB.
			const users = await User.findAll();

			// Everything's fine, send response,
			return createOKResponse({
				res, 
				content:{
					users
				}
			});
		}
		catch(error){
			console.error("UsersController._getAll error: ", error);
			return _processError(error, req, res);
		}
	};


	return {
		register: _register,
		login: _login,
		validate: _validate,
		getAll: _getAll
	};
};

module.exports = UsersController;