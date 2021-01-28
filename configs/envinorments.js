require('dotenv').config();

module.exports = {
	current: process.env.NODE_ENV,
	allowed: [
		'development',
		'testing',
		'staging',
		'production'
	]
}