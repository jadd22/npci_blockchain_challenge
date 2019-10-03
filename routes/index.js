const routes = require('./routes');
const pages = require('./npci');
module.exports = function (app) {
  app.use(pages);
  app.use(routes);
};