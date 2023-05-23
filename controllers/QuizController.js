const quizService = require("../services/QuizService");

exports.getAllQuizs = async (req, res) => {
  try {
    const quizzes = await quizService.getAllQuizs();
    res.json({ data: quizzes, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.json({ data: quiz, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id);
    res.json({ data: quiz, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await quizService.updateQuiz(req.params.id, req.body);
    res.json({ data: quiz, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await quizService.deleteQuiz(req.params.id);
    res.json({ data: quiz, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};