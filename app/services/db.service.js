const database = require('../../config/database');

const dbService = (environment) => {
	const authenticateDB = () => (
		database.authenticate()
	);

	const dropDB = () => (
		database.drop()
	);

	const syncDB = () => (
		database.sync()
	);

	const successfulDBStart = () => (
		console.info('\x1b[1m', 'Connection to the database is fully operational', '\x1b[0m')
	);

	const errorDBStart = (err) => (
		console.error('Unable to connect to the database:', err)
	);

	const wrongEnvironment = () => {
		console.error(`Only development, staging, test and production are valid NODE_ENV variables but ${environment} is specified`);
		return process.exit(1);
	};

	/* Initializers */
	const startDev = ()=>(
		authenticateDB()
		.then(() => {
			return successfulDBStart();
		})
		.catch((err) => errorDBStart(err))
	);

	const startStage = ()=>(
		authenticateDB()
		.then(() => {
			return successfulDBStart();
		})
		.catch((err) => errorDBStart(err))
	);

	const startTest = ()=>(
		authenticateDB()
		.then(() => {
			return successfulDBStart();
		})
		.catch((err) => errorDBStart(err))
	);

	const startProd = ()=>(
		authenticateDB()
		.then(() => {
			return successfulDBStart();
		})
		.catch((err) => errorDBStart(err))
	);

	const start = () => {
		switch (environment) {
			case 'development':
				return startDev();
			case 'staging':
				return startStage();
			case 'testing':
				return startTest();
			case 'production':
				return startProd();
			default:
				return wrongEnvironment();
		}
	};

	return {
		start
	};
};

module.exports = dbService;
module.exports.migrate = (force=false)=>{

	if (typeof force !== 'boolean'){
		console.error("Wrong force parameter; must be boolean");
		return;
	}

	return database
	.authenticate()
	.then(() => {
		console.log('Models to sync:', database.models);
		return database
		.sync({ force })
		.then(() => console.log('Successful migration'))
		.catch((err) => console.error(err));
	})
};
