const privateAPIRoutes = require('./routes/api/privateRoutes');
const publicAPIRoutes = require('./routes/api/publicRoutes');

const publicWebRoutes = require('./routes/web/publicRoutes');

module.exports = {
	keep: false,
	api: {
		privateRoutes:privateAPIRoutes,
		publicRoutes:publicAPIRoutes
	},
	web:{
		publicRoutes:publicWebRoutes
	},
	port: process.env.APP_PORT || process.env.PORT || '2018'
};