require('dotenv').config();
// Models to migrate
require('./models');
// require('./modelsMissing');

if(process.env.NODE_ENV !== 'development'){
  return console.error('Migrator error: cannot make any actions in non-dev env');
};

const dbService = require('../app/services/db.service');

const main = async ()=>{
	try{
		await dbService.migrate(true);
		process.exit(0);
	}
	catch(error){
		console.error({ error });
		process.exit(1);
	}
}

main();