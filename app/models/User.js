// ORM:
const { DataTypes } = require('sequelize');
const sequelize = require('#configs/database');

// Password hasher.
const bcryptSevice = require('#services/bcrypt.service');


const User = sequelize.define(
	'User',
	{
		email: {
			type: DataTypes.STRING(255),
			unique: true,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING(80),
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING(175),
			allowNull: true
		}
	},
	{
		timestamps: true
	}
);

// Hooks:
User.beforeCreate((user, options) => {
	// Hash user's password.
	user.password = bcryptSevice.hashPassword(user);
});
// Hooks\

// Static methods:
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
// Static methods\

// Instance methods:
User.prototype.fullName = function() {
	return `${this.firstName ?? ""} ${this.lastName ?? ""}`.trim();
}

User.prototype.toJSON = function() {
	const values = { ...this.get() };
	delete values.password;
	return values;
};
// Instance methods\

module.exports = User;