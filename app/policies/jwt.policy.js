// JWT Service.
const JWT = require('#services/jwt.service');
// Reponse protocols.
const { createErrorResponse } = require("#factories/responses/api");

const ACCESS_TOKEN_NAME = 'Authorization';

module.exports = async (req, res, next) => {
	try{
		// Format of token: "Authorization: Bearer [token]"
		let tokenToVerify;

		// Check token in Header
		if (req.header(ACCESS_TOKEN_NAME)) {
			const parts = req.header(ACCESS_TOKEN_NAME).split(' ');

			if (parts.length === 2 && /^Bearer$/.test(parts[0])) {
				tokenToVerify = parts[1];
			} 
			else {
				const error = new Error(`Format for ${ACCESS_TOKEN_NAME}: Bearer [token]`);
				error.status = 401;
				throw error;
			}
		}
		// Check token in query
		else if (!!req.query.token) {
			tokenToVerify = req.query.token;
			delete req.body.token;
		}
		// Check token in body
		else if (!!req.body.token) {
			tokenToVerify = req.body.token;
			delete req.query.token;
		} 
		else {
			const error = new Error(`No ${ACCESS_TOKEN_NAME} was found`);
			error.status = 401;
			throw error;
		}

		const parsedToken = await JWT.verifyAccessToken(tokenToVerify);

		// Everything's good, procceed
		req.token = parsedToken;
		return next();
	}
	catch(error){
		return createErrorResponse({
			res, 
			error,
			status: error?.statusCode
		});
	}
};