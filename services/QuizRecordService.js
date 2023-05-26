const QuizRecordModel = require("../models/QuizRecord");

exports.getAllQuizRecords = async () => {
    return await QuizRecordModel.find();
}

exports.getQuizRecordById = async (id) => {
    return await QuizRecordModel.findById(id);
}

exports.createQuizRecord = async (quizRecord) => {
    return await QuizRecordModel.create(quizRecord);
}

exports.updateQuizRecord = async (id, quizRecord) => {
    return await QuizRecordModel.findByIdAndUpdate(id, quizRecord);
}

exports.deleteQuizRecord = async (id) => {
    return await QuizRecordModel.findByIdAndDelete(id);
}