const processError = (error, req, res) => {
	console.error({ error });

	const params = { title: `${error.status} error`, heading: `${error.status} | ${error.message}.` };
	return res.render('error', params);
};

const ErrorPagesController = () => {
	
	const getErrorPage = (req, res) => {
		try{
			// Get error code from request
			const errorCode = req.params.errorCode;

			// Render error view
			const params = { title: `${errorCode} error`, heading: `${errorCode} Error.` };
			return res.render('error', params);
		}
		catch(error){
			return processError(error, req, res);
		}
	}

	return {
		getErrorPage
	};
};

module.exports = ErrorPagesController;