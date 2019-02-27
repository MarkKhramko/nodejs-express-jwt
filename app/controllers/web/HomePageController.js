const processError = (err, req, res) => {
  console.error(err);
  return res.render('500');
};

const HomePageController = () => {

	const getHomePage = (req, res) =>{

		return res.render('home');
	};

	const getError404 = (req, res) =>{
		return res.render('404');
	}

	return {
		getHomePage,
		getError404
	};
};

module.exports = HomePageController;