const mongoose = require("mongoose");
const Comment = mongoose.model("comments");

module.exports = (app) => {
  app.get("/api/comments", async (req, res) => {
    const comments = await Comment.find({ itemId: req.query.itemId });

    res.send(comments);
  });

  app.post("/api/comments", async (req, res) => {
    const { email, name, comment, itemId } = req.body;

    const comments = await new Comment({
      email,
      name,
      comment,
      itemId,
    }).save();

    res.send({});
  });
};
