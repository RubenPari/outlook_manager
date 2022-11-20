"use strict";

const Hapi = require("@hapi/hapi");
const { setUpRoutes } = require("./routes/routes");
const { loadEnv } = require("./utils/load_env");

loadEnv();

const init = async () => {
  let server = Hapi.server({
    port: process.env.PORT,
    host: "localhost",
  });

  await server.register({
    plugin: require("hapi-server-session"),
    options: {
      cookie: {
        isSecure: false,
      },
    },
  });

  server = setUpRoutes(server);

  await server.start();

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
