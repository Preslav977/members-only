const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 5, maxLength: 30 },
  last_name: { type: String, required: true, minLength: 5, maxLength: 30 },
  email: { type: String, required: true, minLength: 5, maxLength: 50 },
  password: { type: String, required: true, minLength: 5 },
  confirm_password: {
    type: String,
    required: true,
    minLength: 5,
  },
  membership_status: { type: Boolean },
});

module.exports = mongoose.model("User", UserSchema);
