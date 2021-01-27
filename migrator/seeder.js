require('dotenv').config();

// Data to seed:
// Import models that you want to seed

const main = async () => {
	try{
		if(process.env.NODE_ENV !== 'development'){
			const error = new Error("Can not make any actions in non-dev env.");
		  throw error;
		};

		console.warn("All seeds inserted");
		process.exit(0);
	}
	catch(error){
		console.error('Seeder error:', error);
		process.exit(1);
	}
};

main();