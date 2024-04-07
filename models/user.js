const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 5, maxLength: 30 },
  last_name: { type: String, required: true, minLength: 5, maxLength: 30 },
  username: { type: String, required: true, minLength: 5, maxLength: 30 },
  password: { type: String, required: true, minLength: 8 },
  confirm_password: {
    type: String,
    required: true,
    minLength: 8,
  },
  membership_status: { type: Boolean },
});

module.exports = mongoose.model("User", UserSchema);
