const { loadEnv } = require("../utils/load_env");
const axios = require("axios");

loadEnv();

const getAll = {
  method: "GET",
  path: "/mail/getAll",
  handler: async (req, res) => {
    const accessToken = req.session.accessToken;

    let response = null;
    let code = null;

    const responseApi = await axios.get(process.env.BASE_URL + "/me/messages", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (responseApi.status !== 200 && responseApi.status !== 401) {
      response = {
        status: "error",
        message: "Error getting messages",
        data: response.data,
      };

      code = 500;
    } else if (responseApi.status === 401) {
      response = {
        status: "error",
        message: "Unauthorized",
      };

      code = 401;
    } else {
      response = {
        status: "success",
        data: responseApi.data,
      };

      code = 200;
    }

    return res.response(response).code(code);
  },
};

module.exports = {
  getAll,
};
