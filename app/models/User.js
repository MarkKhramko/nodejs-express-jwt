const Sequelize = require('sequelize');
const bcryptSevice = require('#services/bcrypt.service');

const sequelize = require('#configs/database');

const hooks = {
	beforeCreate(user) {
		user.password = bcryptSevice.hashPassword(user);
	},
};

const tableName = 'users';

const User = sequelize.define('User', {
	email: {
		type: Sequelize.STRING,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
	},
}, { hooks, tableName });

User.findOneByEmail = function(email) {
	const query = {
		where: {
			email
		}
	};
	return this.findOne(query);
}

User.prototype.toJSON = function() {
	const values = { ...this.get() };
	delete values.password;
	return values;
};

module.exports = User;