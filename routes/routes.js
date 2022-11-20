const { login, callback } = require("../controllers/auth");
const { getAll } = require("../controllers/mail");

function setUpRoutes(server) {
  /* Auth */
  server.route(login);
  server.route(callback);

  /* Mail */
  server.route(getAll);

  return server;
}

module.exports = {
  setUpRoutes,
};
