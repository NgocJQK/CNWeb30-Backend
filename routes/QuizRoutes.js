const express = require("express");
const {
    getAllQuizs,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
} = require("../controllers/QuizController");

const router = express.Router();

router.route("/").get(getAllQuizs).post(createQuiz);
router.route("/:id").get(getQuizById).put(updateQuiz).delete(deleteQuiz);

module.exports = router;