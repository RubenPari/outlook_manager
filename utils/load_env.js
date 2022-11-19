function loadEnv() {
  require("dotenv").config({
    path: "./../.env",
  });
}

module.exports = {
  loadEnv,
};
