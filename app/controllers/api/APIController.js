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

	// Perform your process here...

	return createErrorResponse({
		res, 
		error: {
			message: errorMessage
		},
		status: statusCode
	});
};

const APIController = () => {

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
	};

	return {
		getStatus: _getStatus
	};
};

module.exports = APIController;