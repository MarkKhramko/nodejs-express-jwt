module.exports = {
	secret: process.env.JWT_SECRET || "secret",
	expiresIn: 2 * 60 * 1000 // 2 minutes
}