const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.user_create_get = (req, res, next) => {
  res.render("sign-up-form");
};

exports.user_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 30 })
    .escape()
    .withMessage(
      "First name must be at least 5 characters and not more than 30.",
    ),
  body("last_name")
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 30 })
    .escape()
    .withMessage(
      "Last name must be at least 5 characters and not more than 30.",
    ),
  body("email")
    .trim()
    .isLength({ min: 5 })
    .isLength({ max: 50 })
    .escape()
    .withMessage("Email must be at least 5 characters and not more than 50."),
  body("password").isLength({ min: 5 }),
  body("confirm_password").custom(
    (value, { req }) => value === req.body.password,
  ),

  asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log(err);
      }
      try {
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashedPassword,
          confirm_password: hashedPassword,
          membership_status: false,
        });
        const result = await user.save();
        res.redirect("/");
      } catch (error) {
        console.log(error);
      }
    });
  }),
];

exports.user_log_in_post = (req, res, next) => {
  res.render("log-in-form");
};
