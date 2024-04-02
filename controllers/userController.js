const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.user_create_get = (req, res, next) => {
  res.render("sign-up-form");
};

exports.user_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User create POST");
});
