const express = require("express");
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/QuizController");
const auth = require("../auth/auth");
const { createRule } = require("../validators/QuizRule");
const { validate } = require("../validators/Validator");

const router = express.Router();

// router.use(auth);
router.route("/").get(getAllQuizzes).post(createRule(), validate, createQuiz);
router.route("/:id").get(getQuizById).delete(deleteQuiz);

module.exports = router;
