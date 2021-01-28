const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');
const CHARSET = 'utf8';
const COLLATE = 'utf8_general_ci';

let database;

switch (process.env.NODE_ENV) {
	case 'production':
		database = new Sequelize(
			connection.production.database,
			connection.production.username,
			connection.production.password, {
				host: connection.production.host,
				port: connection.production.port,
				dialect: connection.production.dialect,
				pool: {
					max: 5,
					min: 0,
					idle: 10000,
				},
				charset: CHARSET,
				collate: COLLATE, 
				timestamps: true,
				logging:false
			}
		);
		break;
	case 'testing':
		database = new Sequelize(
			connection.testing.database,
			connection.testing.username,
			connection.testing.password, {
				host: connection.testing.host,
				port: connection.testing.port,
				dialect: connection.testing.dialect,
				pool: {
					max: 5,
					min: 0,
					idle: 10000,
				},
				charset: CHARSET,
				collate: COLLATE, 
				timestamps: true,
				logging:false
			}
		);
		break;
	default:
		database = new Sequelize(
			connection.development.database,
			connection.development.username,
			connection.development.password, {
				host: connection.development.host,
				port: connection.development.port,
				dialect: connection.development.dialect,
				pool: {
					max: 5,
					min: 0,
					idle: 10000,
				},
				charset: CHARSET,
				collate: COLLATE,
				timestamps: true,
				logging:false
			},
		);
}

module.exports = database;