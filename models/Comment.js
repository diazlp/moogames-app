const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  email: String,
  name: String,
  comment: String,
  itemId: Number,
});

mongoose.model("comments", commentSchema);
