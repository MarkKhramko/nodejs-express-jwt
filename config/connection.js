const development = {
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || '3306',
	dialect: process.env.DB_DIALECT || 'mysql' || 'postgres',
};

const testing = {
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || '3306',
	dialect: process.env.DB_DIALECT || 'mysql' || 'postgres',
};

const production = {
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST || 'localhost',
	port: process.env.DB_PORT || '3306',
	dialect: process.env.DB_DIALECT || 'mysql' || 'postgres',
};

module.exports = {
	development,
	testing,
	production,
};