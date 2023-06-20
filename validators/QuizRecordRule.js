const { body, param } = require("express-validator");

const quizRecordService = require("../services/QuizRecordService");
const quizService = require("../services/QuizService");

const recordRule = () => {
  return [
    param("quizId").custom(async (quizId) => {
      let quiz = await quizService.getQuizById(quizId);
      if (quiz.status != "In Progress") {
        throw new Error("Quiz expired");
      }
    }),
    body("studentId")
      .trim()
      .exists({ value: "falsy" })
      .withMessage("StudentId is required")
      .isNumeric()
      .withMessage("Invalid studentId"),
    body("studentName")
      .trim()
      .exists({ value: "falsy" })
      .withMessage("StudentName is required"),
    // body('isValid').optional().isBoolean().withMessage('Invalid isValid value'),
    body("note").optional().isString().withMessage("Invalid note value"),
  ];
};

module.exports = {
  recordRule,
};
