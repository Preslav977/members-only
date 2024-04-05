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
          username: req.body.username,
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

exports.user_log_in_get = asyncHandler(async (req, res, next) => {
  res.render("log-in-form");
});

exports.user_become_member_get = (req, res, next) => {
  res.render("become-member-form");
};

exports.user_become_member_post = [
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.body.passcode);
    console.log(process.env.passcode);
    // res.render("become-member-form");

    const user = await User.findById(req.user._id).exec();

    if (!user || req.body.passcode !== process.env.passcode) {
      res.render("become-member-form", {
        errors: errors.array(),
      });
    } else {
      await User.findByIdAndUpdate(req.user._id, {
        membership_status: true,
      });
      res.redirect("/");
    }
    // if user found maybe by username or id ?
    // and passcode is equal to the value of the input
    // update this memembership status to true otherwise
    // show wrong passcode
  }),
];
