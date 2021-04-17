const { Pool } = require('pg');
let dbParams = {};

if (process.env.NODE_ENV === 'production'){

	dbParams = {
		host: process.env.DB_HOST_LIVE,
		port: process.env.DB_PORT_LIVE,
		user: process.env.DB_USER_LIVE,
		password: process.env.DB_PASS_LIVE,
		database: process.env.DB_NAME_LIVE,
	};

} else {

	dbParams = {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	};
}


const pool = new Pool(dbParams);
module.exports = pool;

