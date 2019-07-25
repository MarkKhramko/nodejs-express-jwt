const processError = (error, req, res) => {
	console.error({ error });
	return res.render('500');
};

const ErrorPagesController = () => {
	
	const getErrorPage = (req, res) => {
		try{
			// Default error codes are 404, 422, 500
			const errorCode = req.params.errorCode;

			// Render error view
			return res.render(errorCode);
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