const HomePageController = () => {

	const getHomePage = (req, res) =>{
		return res.render('home');
	};

	return {
		getHomePage
	};
};

module.exports = HomePageController;