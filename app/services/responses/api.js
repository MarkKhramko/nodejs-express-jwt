const FORMATS = {
	JSON: "JSON",
	XML: "XML"
}

/* 
	Format for all API responses will be JSON
	{
		content: {...}
		error: {...}
	}
	Status code is sent in header.

	If error is not present, error should be null.
	If error is present, content can be null (But it's not required).
*/

const _createGenericResponse = (options={ res:null, status:200, content:{}, error:null, format:FORMATS.JSON }) => {
	try{
		const data = {
			content: options?.content ?? null,
			error: options?.error ?? null
		};

		switch(options?.format){
			case FORMATS.JSON:
				return options?.res.status(options?.status).json(data);
			case FORMATS.XML:
				break;
			default:{
				const err = new Error("No response format specified.");
				throw err;
			}
		}
	}
	catch(error){
		const err = new Error(`Could not create generic response: ${error.message}`);
		err.name = error?.name;
		err.code = error?.code;
		throw err;
	}
}

// Method should be called on all successful respones:
// options = {
//		res,
//		content,
//		format
// }
const _createOKResponse = (options) => {
	return _createGenericResponse({ 
		...options,
		status:200,
		format:options?.format ?? FORMATS.JSON
	});
}

// Method should be called on failed responses:
// options = {
//		res,
//		error,
//		status,
//		format
// }
const _createErrorResponse = (options) => {
	return _createGenericResponse({
		...options,
		status:options?.status,
		format:options?.format ?? FORMATS.JSON
	});
}

module.exports = {
	createOKResponse: _createOKResponse,
	createErrorResponse: _createErrorResponse
}