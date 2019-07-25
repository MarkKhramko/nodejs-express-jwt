require('dotenv').config();
if(process.env.NODE_ENV !== 'development'){
	return console.error('Seeder error: cannot make any actions in non-dev env');
};

// Data to seed
// Import models that you want to seed

const main = async () => {
	try{
		console.warn("All seeds inserted");
		process.exit(0);
	}
	catch(error){
		console.error({ error });
		process.exit(1);
	}
};

main();