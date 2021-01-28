// Reponse protocols.
const { 
	createOKResponse,
	createErrorResponse
} = require('#services/responses/api');


module.exports = APIController;

function APIController() {

	const _processError = (error, req, res) => {
		// Default error message.
		let errorMessage = error?.message ?? 'Internal server error';
		// Default HTTP status code.
		let statusCode = 500;

		if (error.name === 'TypeError'){
			errorMessage = "Type error. Check your console for details.";
			statusCode = 402;
		}
		// Perform your custom process here...

		// Send error response with provided status code.
		return createErrorResponse({
			res, 
			error: {
				message: errorMessage
			},
			status: statusCode
		})
	}

	const _getStatus = (req, res) => {
		try{
			// Try making some faulty operation here,
			// to see how error will be displayed:
			
			// Like this TypeError.
			// ({}).test();

			// Otherwise it will successfully send operational status.
			return createOKResponse({
				res,
				content:{
					operational: true,
					message: 'API is fully functional!'
				}
			});
		}
		catch(error){
			console.error("APIController._getStatus error: ", error);
			return _processError(error, req, res);
		}
	}

	return {
		getStatus: _getStatus
	}
}