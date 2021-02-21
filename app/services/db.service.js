// ORM.
const Sequelize = require('sequelize');
// Connection configs.
const Configs = require('#configs/database');
// Custom error.
const { Err } = require('#factories/errors');


// Make first database connection.
const connection = new Sequelize(
	Configs.database,
	Configs.username,
	Configs.password,
	{
		host:Configs.host,
		port:Configs.port,
		dialect:Configs.dialect,
		pool:Configs.pool,
		charset:Configs.charset,
		collate:Configs.collate, 
		timestamps:Configs.timestamps,
		logging:Configs.logging
	}
);

module.exports = connection;
module.exports.service = DBService;
module.exports.migrate = _migrate;

function DBService(environment) {

	const _authenticateDB = () => (
		connection.authenticate()
	);

	const _start = async () => {
		try{
			// Test database connection.
			_authenticateDB();

			// Include all models for associations.
			require('#models/');

			// Get newly included models from db connection.
			const models = connection.models;

			// Associate all models with each other.
			await _associateModels(models);

			console.info(`Database info: ${Object.keys(models).length} models associated.`);
			console.info('\x1b[1m', 'Connection to the database is fully operational', '\x1b[0m');

			return Promise.resolve(this.connection);
		}
		catch(error) {
			console.error('Unable to connect to the database:', error)
			return Promise.reject(error);
		}
	};

	return {
		start:_start
	};
};

function _migrate(environment, force=false) {
	// Validation of NODE_ENV.
	if (environment !== 'development'){
		console.error(`Could not migrate in env ${environment}`);
		return;
	}
	// Validation of 'force' parameter.
	else if (typeof force !== 'boolean'){
		console.error("Wrong force parameter; must be boolean");
		return;
	}

	const _successfulDBMigration = () => (
		console.log('Successful migration')
	)

	return connection
	.authenticate()
	.then(() => {
		console.log('Models to sync:', connection.models);
		
		return _associateModels(connection.models)
		.then(() => connection.sync({ force }))
		.then(() => _successfulDBMigration())
		.catch(error => console.error(error));
	})
	.catch(error => console.error(error));
}

async function _associateModels(models) {
	return new Promise((resolve, reject) => {
		try{
			Object.keys(models).map(modelName => (
				models[modelName].associate(models)
			));

			return resolve(models);
		}
		catch(error){
			reject(error);
		}
	});
}
