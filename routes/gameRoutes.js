const axios = require("axios");
const keys = require("../config/keys");

module.exports = (app) => {
  app.get("/api/game", async (req, res) => {
    const response = await axios.get(keys.gameURI);

    res.send(response.data);
  });

  app.post("/api/create/game", async (req, res) => {
    await axios.post(keys.gameURI, req.body, {
      headers: { Authorization: "Bearer " + req.query.token },
    });

    res.send({});
  });

  app.put("/api/edit/game", async (req, res) => {
    const { token, id } = req.query;

    const response = await axios.put(keys.gameURI + "/" + id, req.body, {
      headers: { Authorization: "Bearer " + token },
    });

    res.send(response.data);
  });

  app.post("/api/delete/game", async (req, res) => {
    const { token, id } = req.body.params;

    await axios.delete(keys.gameURI + "/" + id, {
      headers: { Authorization: "Bearer " + token },
    });

    res.send({});
  });
};
