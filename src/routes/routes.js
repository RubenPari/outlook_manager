const { login, callback } = require("../controllers/auth");
const {
  getAll,
  getAllSender,
  deleteAllSender,
} = require("../controllers/mail");

function setUpRoutes(server) {
  /* Auth */
  server.route(login);
  server.route(callback);

  /* Mail */
  server.route(getAll);
  server.route(getAllSender);
  server.route(deleteAllSender);

  return server;
}

module.exports = {
  setUpRoutes,
};
