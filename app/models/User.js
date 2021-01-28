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
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: true
	}
}, { hooks, tableName });

User.findById = function(userId) {
	return this.findByPk(userId);
}

User.findOneByEmail = function(email) {
	const query = {
		where: {
			email
		}
	};
	return this.findOne(query);
}

User.prototype.fullName = function() {
	return `${this.name ?? ""} ${this.lastName ?? ""}`.trim();
}

User.prototype.toJSON = function() {
	const values = { ...this.get() };
	delete values.password;
	return values;
};

module.exports = User;