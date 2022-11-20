const msal = require("@azure/msal-node");
const { getScopes } = require("../utils/get_scopes");
const { loadEnv } = require("../utils/load_env");

loadEnv();

const config = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AUTHORITY,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const pca = new msal.ConfidentialClientApplication(config);

const login = {
  method: "GET",
  path: "/auth/login",
  handler: async (_req, res) => {
    const authCodeUrlParameters = {
      scopes: getScopes(),
      redirectUri: process.env.REDIRECT_URI,
    };

    const url = await pca.getAuthCodeUrl(authCodeUrlParameters);

    return res.redirect(url);
  },
};

const callback = {
  method: "GET",
  path: "/auth/callback",
  handler: async (req, res) => {
    const tokenRequest = {
      code: req.query.code,
      scopes: getScopes(),
      redirectUri: process.env.REDIRECT_URI,
    };

    let response = null;
    let code = null;

    const result = await pca.acquireTokenByCode(tokenRequest);

    if (result.accessToken == null) {
      console.log("Error acquiring token: ", result);

      response = {
        status: "error",
        message: result,
      };

      code = 500;
    } else {
      response = {
        status: "success",
        message: "Token acquired",
        data: result,
      };

      code = 200;

      // save the token in the session
      req.session.accessToken = result.accessToken;
    }

    return res.response(response).code(code);
  },
};

module.exports = {
  login,
  callback,
};
