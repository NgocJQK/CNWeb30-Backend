const quizRecordService = require("../services/QuizRecordService");

exports.getAllQuizRecords = async (req, res) => {
  try {
    const quizRecordzes = await quizRecordService.getAllQuizRecords();
    res.json({ data: quizRecordzes, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQuizRecord = async (req, res) => {
  try {
    const quizRecord = await quizRecordService.createQuizRecord(req.body);
    res.json({ data: quizRecord, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuizRecordById = async (req, res) => {
  try {
    const quizRecord = await quizRecordService.getQuizRecordById(req.params.id);
    res.json({ data: quizRecord, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQuizRecord = async (req, res) => {
  try {
    const quizRecord = await quizRecordService.updateQuizRecord(req.params.id, req.body);
    res.json({ data: quizRecord, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteQuizRecord = async (req, res) => {
  try {
    const quizRecord = await quizRecordService.deleteQuizRecord(req.params.id);
    res.json({ data: quizRecord, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};