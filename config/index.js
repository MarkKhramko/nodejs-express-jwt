const privateAPIRoutes = require('./routes/api/privateRoutes');
const publicAPIRoutes = require('./routes/api/publicRoutes');

const publicWebRoutes = require('./routes/web/publicRoutes');

const dbShouldMigrate = (process.env.DB_SHOULD_MIGRATE === 'true');
console.warn('DB Should migrate:', dbShouldMigrate);

module.exports = {
  keep: false,
  api: {
  	privateRoutes:privateAPIRoutes,
  	publicRoutes:publicAPIRoutes
  },
  web:{
  	publicRoutes:publicWebRoutes
  },
  port: process.env.APP_PORT || process.env.PORT || '2018',
  dbShouldMigrate: dbShouldMigrate,
};