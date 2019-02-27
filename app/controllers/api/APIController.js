const APIController = () => {
  const getStatus = (req, res) => {
  	return res.status(200).json({ message: 'API is fully functional!' });
  };

  return {
    getStatus
  };
};

module.exports = APIController;
