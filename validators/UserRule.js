const { body } = require("express-validator");
const userService = require("../services/UserService");

const registerRule = () => {
  return [
    body("email")
      .trim()
      .exists({ values: "falsy" })
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email")
      .custom(async (email) => {
        const user = await userService.findUserByEmail(email);
        if (user) {
          throw new Error("Email already in use");
        }
      }),
    body("password")
      .trim()
      .exists({ values: "falsy" })
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("userName")
      .trim()
      .exists({ values: "falsy" })
      .withMessage("User's name is required")
      .isLength({ min: 1 })
      .withMessage("User's name must be at least 8 characters long"),
  ];
};

const loginRule = () => {
    return [
        body("email")
      .trim()
      .exists({ values: "falsy" })
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .trim()
      .exists({ values: "falsy" })
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    ]
}

module.exports = {
  registerRule,
  loginRule
};
