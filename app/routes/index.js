/**
 * Middleware for app routes initialization.
 */

// API options.
const apiOptions = require('#config/api');
// Routes:
const apiRoutes = require('#routes/api');
const webRoutes = require('#routes/web');

// Policies.
const auth = require('#policies/auth.policy');

// Mapper of routes to controllers.
const mapRoutes = require('express-routes-mapper');

function Routes(req, res, next) {
	try{
		const { app } = req;

		apiOptions.verions.all.map(versionString => {
			// Secure private API routes with JWT authentication middleware.
			app.all(`/api/${versionString}/private/*`, auth);

			// Set API routes for express appliction
			app.use(`/api/${versionString}`, mapRoutes(apiRoutes(versionString).public, 'app/controllers/api/'));
			app.use(`/api/${versionString}/private`, mapRoutes(apiRoutes(versionString).private, 'app/controllers/api/'));
		});

		// Set web routes for Express appliction.
		app.use('/', mapRoutes(webRoutes.public, `app/controllers/web/`));

		// Everything's ok, continue.
		next();
	}
	catch(error){
		const err = new Error(`Could not setup routes: ${error.message}`);
		err.name = error?.name;
		err.code = error?.code;
		throw err;
	}
}

module.exports = Routes;