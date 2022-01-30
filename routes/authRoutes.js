const axios = require("axios");
const keys = require("../config/keys");

module.exports = (app) => {
  app.post("/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    const response = await axios.post(keys.registerURI, {
      name,
      email,
      password,
    });

    res.send(response.data);
  });

  app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const response = await axios.post(keys.loginURI, { email, password });

    res.send(response.data);
  });

  app.post("/auth/change/password", async (req, res) => {
    const { token } = req.query;

    await axios.post(keys.changePasswordURI, req.body, {
      headers: { Authorization: "Bearer " + token },
    });

    res.send({});
  });
};
