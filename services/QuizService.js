const QuizModel = require("../models/Quiz");

const addStatusToQuiz = (quiz) => {
  const currentTime = new Date().getTime();
  const quizStartTime = quiz.startTime.getTime();
  const quizEndTime = quiz.endTime.getTime();
  let status = "";
  if (currentTime < quizStartTime) {
    status = "incoming";
  } else if (quizEndTime < currentTime) {
    status = "finished";
  } else {
    status = "happening";
  }
  quiz.status = status;
  return quiz;
};

const removeVersionKey = (document) => {
    return document ? document.toObject({versionKey: false}) : null;
}

exports.getAllQuizzes = async () => {
  const quizzes = await QuizModel.find().populate("_class");
  let returnData = [];
  quizzes.map((quiz) => {
    returnData.push(addStatusToQuiz(removeVersionKey(quiz)));
  });
  return returnData;
};

exports.getQuizById = async (id) => {
  const quiz = await QuizModel.findById(id).populate("_class");
  return addStatusToQuiz(removeVersionKey(quiz));
};

exports.createQuiz = async (quiz) => {
  return await QuizModel.create(quiz);
};

exports.updateQuiz = async (id, quiz) => {
  return await QuizModel.findByIdAndUpdate(id, quiz);
};

exports.deleteQuiz = async (id) => {
  return await QuizModel.findByIdAndDelete(id);
};
