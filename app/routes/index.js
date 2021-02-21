/**
 * Middleware for app routes initialization.
 */

// API options.
const apiOptions = require('#configs/api');
// Routes:
const apiRoutes = require('#routes/api');
const webRoutes = require('#routes/web');
// Policies:
const accessTokenMiddleware = require('#policies/accessToken.policy');
const refreshTokenMiddleware = require('#policies/refreshToken.policy');
// Mapper of routes to controllers.
const mapRoutes = require('express-routes-mapper');


module.exports = _setUpRoutes;

function _setUpRoutes(options={}) {
	try {
		const app = options?.app;

		apiOptions.versions.all.map(versionString => {
			// Secure private API routes with JWT access token middleware.
			app.all(`/api/${versionString}/private/*`, accessTokenMiddleware);

			// Secure refresh route and logout with JWT refresh token middleware:
			app.use(`/api/${versionString}/auth/refresh`, refreshTokenMiddleware);
			app.use(`/api/${versionString}/auth/logout`, refreshTokenMiddleware);


			// Set API routes for express application
			app.use(`/api/${versionString}`, mapRoutes(apiRoutes(versionString).public, 'app/controllers/api/'));
			app.use(`/api/${versionString}/private`, mapRoutes(apiRoutes(versionString).private, 'app/controllers/api/'));
		});

		// Set web routes for Express appliction.
		app.use('/', mapRoutes(webRoutes.public, `app/controllers/web/`));

		// Everything's ok, continue.
		return (req, res, next)=>next();
	}
	catch(error) {
		const err = new Error(`Could not setup routes: ${error.message}`);
		err.name = error?.name;
		err.code = error?.code;
		throw err;
	}
}
