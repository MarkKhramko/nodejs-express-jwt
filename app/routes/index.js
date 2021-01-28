/**
 * Middleware for app routes initialization.
 */

// API options.
const apiOptions = require('#configs/api');
// Routes:
const apiRoutes = require('#routes/api');
const webRoutes = require('#routes/web');

// Policies.
const JWT = require('#policies/jwt.policy');

// Mapper of routes to controllers.
const mapRoutes = require('express-routes-mapper');

function Routes(options={}) {
	try{
		const app = options?.app;

		apiOptions.verions.all.map(versionString => {
			// Secure private API routes with JWT authentication middleware.
			app.all(`/api/${versionString}/private/*`, JWT);

			// Set API routes for express appliction
			app.use(`/api/${versionString}`, mapRoutes(apiRoutes(versionString).public, 'app/controllers/api/'));
			app.use(`/api/${versionString}/private`, mapRoutes(apiRoutes(versionString).private, 'app/controllers/api/'));
		});

		// Set web routes for Express appliction.
		app.use('/', mapRoutes(webRoutes.public, `app/controllers/web/`));

		// Everything's ok, continue.
		return (req, res, next)=>next();
	}
	catch(error){
		const err = new Error(`Could not setup routes: ${error.message}`);
		err.name = error?.name;
		err.code = error?.code;
		throw err;
	}
}

module.exports = Routes;