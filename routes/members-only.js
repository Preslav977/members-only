const express = require("express");

const router = express.Router();

const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

router.get("/sign-up", user_controller.user_create_get);

router.post("/sign-up", user_controller.user_create_post);

router.get("/log-in", user_controller.user_log_in_post);

module.exports = router;
