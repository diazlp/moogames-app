const axios = require("axios");
const keys = require("../config/keys");

module.exports = (app) => {
  app.get("/api/movie", async (req, res) => {
    const response = await axios.get(keys.movieURI);

    res.send(response.data);
  });

  app.post("/api/create/movie", async (req, res) => {
    const response = await axios.post(keys.movieURI, req.body, {
      headers: { Authorization: "Bearer " + req.query.token },
    });

    res.send(response.data);
  });

  app.put("/api/edit/movie", async (req, res) => {
    const { token, id } = req.query;

    console.log(req.params);

    const response = await axios.put(keys.movieURI + "/" + id, req.body, {
      headers: { Authorization: "Bearer " + token },
    });

    res.send(response.data);
  });

  app.post("/api/delete/movie", async (req, res) => {
    const { token, id } = req.body.params;

    await axios.delete(keys.movieURI + "/" + id, {
      headers: { Authorization: "Bearer " + token },
    });

    res.send({});
  });
};
