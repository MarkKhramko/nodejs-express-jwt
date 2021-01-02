const jwt = require('jsonwebtoken');
const Config = require('config/jwt');

const { secret, expiresIn } = Config;

module.exports = {
	issue: (payload) => jwt.sign(payload, secret, { expiresIn }),
	verify: (token, cb) => jwt.verify(token, secret, {}, cb),
};