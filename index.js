const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/Comment");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

require("./routes/authRoutes")(app);
require("./routes/commentRoutes")(app);
require("./routes/gameRoutes")(app);
require("./routes/movieRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets (main.js and/or main.css)
  app.use(express.static("client/build"));

  // Express will serve up index.html if it's not in the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
