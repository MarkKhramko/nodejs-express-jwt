module.exports = versionString => ({
	private: require(`./${versionString}/privateRoutes`),
	public: require(`./${versionString}/publicRoutes`)
});