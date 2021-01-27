/**
 * Main application file:
 */

const environments = require('#config/envinorments');
// Middleware for parsing requests bodies.
const bodyParser = require('body-parser');
// Express.
const express = require('express');
const http = require('http');
// Mild security.
const helmet = require('helmet');
// Cross-origin requests middleware.
const cors = require('cors');

// Server configuration:
// ORM.
const dbService = require('#services/db.service');
// Port info.
const serverConfig = require('#config/server');
// Routes.
const routes = require('#routes/');
// Server configuration\

// Express application.
const app = express();
// HTTP server (Do not use HTTPS, manage TLS with some proxy, like Nginx).
const server = http.Server(app);
// Initialize ORM.
const DB = dbService(environments.current).start();

// Allow cross origin requests
// (configure to only allow requests from certain origins).
app.use(cors());

// Set views path.
app.set('views', __dirname+'/views');
// Set template engine (Pug by default).
app.set('view engine', 'pug');
// Set folder for static contents.
app.use(express.static('public'));

// secure express app
app.use(helmet({
	dnsPrefetchControl: false,
	frameguard: false,
	ieNoOpen: false,
}));

// Parsing the request bodies.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup routes.
app.use(routes);

// Initialize server:
server.listen(serverConfig.port, () => {
	if (environments.allowed.indexOf(environments.current) === -1) {
		console.error(`NODE_ENV is set to ${environments.current}, but only ${environments.allowed.toString()} are valid.`);
		process.exit(1);
	} 
	else {
		console.log('\x1b[1m', `server is running on port: ${serverConfig.port}`, '\x1b[0m');
	}
	return DB;
});
