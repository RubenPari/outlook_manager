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

const getAllSender = {
  method: "GET",
  path: "/mail/getAllSender",
  handler: async (req, res) => {
    const accessToken = req.session.accessToken;

    let response = null;
    let code = null;

    const { sender } = req.query;

    const responseApi = await axios.get(
      process.env.BASE_URL +
        `/me/messages?$filter=from/emailAddress/address eq '${sender}'`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (responseApi.status !== 200 && responseApi.status !== 401) {
      response = {
        status: "error",
        message: "Error getting messages",
        data: response.data,
      };

      code = 500;

      return res.response(response).code(code);
    } else if (responseApi.status === 401) {
      response = {
        status: "error",
        message: "Unauthorized",
      };

      code = 401;

      return res.response(response).code(code);
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

const deleteAllSender = {
  method: "DELETE",
  path: "/mail/deleteAllSender",
  handler: async (req, res) => {
    const accessToken = req.session.accessToken;

    let response = null;
    let code = null;

    const { sender } = req.query;

    const responseApi = await axios.get(
      process.env.BASE_URL +
        `/me/messages?$filter=from/emailAddress/address eq '${sender}'`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (responseApi.status !== 200 && responseApi.status !== 401) {
      response = {
        status: "error",
        message: "Error getting messages",
        data: response.data,
      };

      code = 500;
    }

    if (responseApi.status === 401) {
      response = {
        status: "error",
        message: "Unauthorized",
      };

      code = 401;
    }

    const messages = responseApi.data.value;

    // TODO: make func
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      const responseDelete = await axios.delete(
        process.env.BASE_URL + `/me/messages/${message.id}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (responseDelete.status !== 204) {
        response = {
          status: "error",
          message:
            "Deleted messages from 1 to " +
            i +
            " , error deleting message" +
            i + 1,
        };

        code = 500;
      }

      response = {
        status: "success",
        message: "Messages deleted",
      };

      code = 200;

      return res.response(response).code(code);
    }
  },
};

module.exports = {
  getAll,
  getAllSender,
  deleteAllSender,
};
