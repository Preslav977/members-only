const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

exports.new_message_get = (req, res, next) => {
  res.render("new-message-form");
};

exports.new_message_post = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 50 })
    .escape()
    .withMessage("Title must be at least 5 characters and not more than 30."),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 100 })
    .withMessage("Content must be at least 5 characters and not more than 30."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      timestamp: new Date(),
      user: req.user,
    });

    if (!errors.isEmpty()) {
      res.render("new-message-form", {
        errors: errors.array(),
      });
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];
