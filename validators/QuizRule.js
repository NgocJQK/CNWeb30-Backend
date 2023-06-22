const { body } = require("express-validator");

const createRule = () => {
  return [
    body("startTime")
      .trim()
      .exists({ value: "falsy" })
      .withMessage("StartTime is required")
      .isISO8601()
      .withMessage("Invalid date"),
    body("endTime")
      .trim()
      .exists({ value: "falsy" })
      .withMessage("EndTime is required")
      .isISO8601()
      .withMessage("Invalid date"),
    body("formLink")
      .optional({ value: "falsy" })
      .isURL()
      .withMessage("Invalid Form Link")
  ];
};

module.exports = {
    createRule
}