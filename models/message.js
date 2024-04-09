const mongoose = require("mongoose");

const { Schema } = mongoose;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 5, maxLength: 50 },
  content: { type: String, required: true, minLength: 5, maxLength: 50 },
  timestamp: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", MessageSchema);
