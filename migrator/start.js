require('dotenv').config();
// Models to migrate
require('./models');
// require('./modelsMissing');

const dbService = require('#services/db.service');

const main = async ()=>{
	try{
		if(process.env.NODE_ENV !== 'development'){
			const error = new Error("Can not make any actions in non-dev env.");
			throw error;
		}

		await dbService.migrate(true);
		console.log("All models migrated.");
		process.exit(0);
	}
	catch(error){
		console.error("Migrator error:", error);
		process.exit(1);
	}
}

main();