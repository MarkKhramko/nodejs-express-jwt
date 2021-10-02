const accessToken = {
	secret: process.env.JWT_ACCESS_SECRET,
	expiresIn: 60 * 60 * 1000 // 60 mins = 1 hr
}
const refreshToken = {
	secret: process.env.JWT_REFRESH_SECRET,
	expiresIn: 14 * 24 * 60 * 60 * 1000 // 14 days
}

module.exports = {
	accessToken,
	refreshToken
}