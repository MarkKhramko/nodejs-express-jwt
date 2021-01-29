// Method should be called on all successful respones:
const _createOKResponse = (res=null, viewName=null, params={}) => {
	return res.render(viewName, params);
}

// Method should be called on failed responses
const _createErrorResponse = (res, error={}, code=500) => {
	const statusCode = error?.status ?? code;
	const params = { title: `${statusCode} error`, heading: `${statusCode} | ${error.message}.` };
	return res.render('error', params);
}

module.exports = {
	createOKResponse: _createOKResponse,
	createErrorResponse: _createErrorResponse
}