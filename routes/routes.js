const { login, callback } = require("../controllers/auth");

function setUpRoutes(server) {
  server.route(login);
  server.route(callback);

  return server;
}

module.exports = {
  setUpRoutes,
};
