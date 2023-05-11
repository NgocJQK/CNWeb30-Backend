const QuizModel = require("../models/Quiz");

exports.getAllQuizs = async () => {
    return await QuizModel.find();
}

exports.getQuizById = async (id) => {
    return await QuizModel.findById(id);
}

exports.createQuiz = async (quiz) => {
    return await QuizModel.create(quiz);
}

exports.updateQuiz = async (id, quiz) => {
    return await QuizModel.findByIdAndUpdate(id, quiz);
}

exports.deleteQuiz = async (id) => {
    return await QuizModel.findByIdAndDelete(id);
}