// User facade.
const userFacade = require('#facades/user');
// JWT service.
const JWT = require('#services/jwt.service');

// Reponse protocols.
const { 
	createOKResponse,
	createErrorResponse
} = require('#factories/responses/api');


module.exports = UsersController;

function UsersController() {

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
		// Perform your custom process here...

		// Send error response with provided status code.
		return createErrorResponse({
			res, 
			error: {
				message: errorMessage
			},
			status: statusCode
		});
	}

	const _register = async (req, res) => {
		try{
			// Extract request input:
			const email = req.body?.email;
			const password = req.body?.password;

			const [token, user] = await userFacade.register({ email, password });

			// Everything's fine, send response.
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
	}

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

			const [token, user] = await userFacade.login({ email, password });

			// Everything's fine, send response.
			return createOKResponse({
				res, 
				content:{
					token,
					user
				}
			});
		}
		catch(error){
			console.error("UsersController._login error: ", error);
			return _processError(error, req, res);
		}
	}

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
	}

	// _getFullName is a method, protected by JWT policy,
	// so we will have token in request, that we will use:
	const _getFullName = async (req, res) => {
		try{
			const userId = req?.token?.id;

			const [ fullName ] = await userFacade.getFullName({ userId });

			// Everything's fine, send response.
			return createOKResponse({
				res, 
				content:{
					fullName
				}
			});
		}
		catch(error){
			console.error("UsersController._getFullName error: ", error);
			return _processError(error, req, res);
		}
	}


	return {
		register: _register,
		login: _login,
		validate: _validate,
		getFullName: _getFullName
	}
}