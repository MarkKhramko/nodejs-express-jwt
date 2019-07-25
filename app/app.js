/**
 * Third party libraries
 */
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
// Security
const helmet = require('helmet');
// Cross-origin
const cors = require('cors');
// Gzip compression
const compression = require('compression');

/**
 * Server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const auth = require('./policies/auth.policy');

// Environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * Express application
 */
const app = express();
const server = http.Server(app);
const DB = dbService(environment, config.dbShouldMigrate).start();

// Enable gzip compression
app.use(compression());

// Allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// Set views path, template engine and default layout
app.set('views', __dirname+'/views');
app.set('view engine', 'pug');
app.use(express.static('public'));

// secure express app
app.use(helmet({
	dnsPrefetchControl: false,
	frameguard: false,
	ieNoOpen: false,
}));

// Parsing the request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Secure private routes with jwt authentication middleware
app.all('/api/private/*', (req, res, next) => auth(req, res, next));

// Set API routes for express appliction
app.use('/api', mapRoutes(config.api.publicRoutes, 'app/controllers/api/'));
app.use('/api/private', mapRoutes(config.api.privateRoutes, 'app/controllers/api/'));

// Set web routes for express appliction
app.use('/', mapRoutes(config.web.publicRoutes, 'app/controllers/web/'));

server.listen(config.port, () => {
	if (environment !== 'production' &&
		environment !== 'development' &&
		environment !== 'testing'
	) {
		console.error(`NODE_ENV is set to ${environment}, but only "production", "testing" and "development" are valid.`);
		process.exit(1);
	} 
	else {
		console.log('\x1b[1m', `server is running on port: ${config.port}`, '\x1b[0m');
	}
	return DB;
});
