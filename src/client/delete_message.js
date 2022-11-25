const axios = require("axios");

async function deleteMessageById(accessToken) {
  const responseDelete = await axios.delete(
    process.env.BASE_URL + `/me/messages/${message.id}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  if (responseDelete.status !== 204) code = 500;

  code = 200;

  return code;
}

module.exports = {
  deleteMessageById,
};
