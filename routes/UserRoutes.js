const express = require("express");
const { register, login } = require("../controllers/UserController");
const { registerRule, loginRule } = require("../validators/UserRule");
const { validate } = require("../validators/Validator");

const router = express.Router();

// router.use(registerRule(), validate);
router.route("/register").post(registerRule(), validate, register);
router.route("/login").post(loginRule(), validate, login);

module.exports = router;
