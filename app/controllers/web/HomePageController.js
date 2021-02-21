// Reponse protocols.
const {
	createOKResponse,
	createErrorResponse
} = require('#factories/responses/web');

const HomePageController = () => {

	const _getHomePage = (req, res) =>{
		try {
			// Try making some faulty operation here,
			// to see how error will be displayed:
			
			// Like this TypeError.
			// ({}).test();

			// Otherwise it will successfully render home page.
			return createOKResponse(res, 'home');
		}
		catch(error) {
			console.error("HomePageController._getHomePage error:", error);
			return createErrorResponse(res, error);
		}
	}

	return {
		getHomePage: _getHomePage
	}
}

module.exports = HomePageController;