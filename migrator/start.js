// Import config from .env file.
require('dotenv').config();
// Models to migrate.
require('./models');
// Connection to database
const db = require('#services/db.service');


async function _main() {
	try {
		if (process.env.NODE_ENV !== 'development') {
			const error = new Error("Can not make any actions in non-dev env.");
			throw error;
		}

		// Set 'force' to true if you want to rewrite database.
		const force = true;
		await db.migrate(process.env.NODE_ENV, force);
		console.log("All models migrated.");
		process.exit(0);
	}
	catch(error) {
		console.error("Migrator error:", error);
		process.exit(1);
	}
}

// Start.
_main();
