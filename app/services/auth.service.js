const jwt = require('jsonwebtoken');
const Config = require('config/jwt');

const { secret, expiresIn } = Config;

module.exports = {
	issue: (payload) => jwt.sign(payload, secret, { expiresIn }),
	verify: async (token) => {
		jwt.verify(token, secret, {}, (err, parsedToken)=>{
			if (!!err)
				return Promise.reject(err);

			return Promise.resolve(parsedToken);
		});
	}
};