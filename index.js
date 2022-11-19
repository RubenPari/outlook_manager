"use strict";

const Hapi = require("@hapi/hapi");
const { setUpRoutes } = require("./routes/routes");
const { loadEnv } = require("../utils/load_env");

loadEnv();

let server = Hapi.server({
  port: process.env.PORT,
  host: "localhost",
});

server = setUpRoutes(server);

const init = async () => {
  await server.start();

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
