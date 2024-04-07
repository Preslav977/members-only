const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

exports.new_message_get = (req, res, next) => {
  res.render("new-message-form");
};
