const QuizModel = require("../models/Quiz");
const QuizRecordModel = require("../models/QuizRecord");

const addStatusToQuiz = (quiz) => {
  const currentTime = new Date().getTime();
  const quizStartTime = quiz.startTime.getTime();
  const quizEndTime = quiz.endTime.getTime();
  let status = "";
  if (currentTime < quizStartTime) {
    status = "Not Started";
  } else if (quizEndTime < currentTime) {
    status = "Finished";
  } else {
    status = "In Progress";
  }
  quiz.status = status;
  return quiz;
};

const removeVersionKey = (document) => {
  return document ? document.toObject({ versionKey: false }) : null;
};

exports.getAllQuizzes = async (filters = null) => {
  let query = {};
  if (filters) {
    if ("_class" in filters) {
      query._class = filters._class;
    }
  }

  const quizzes = await QuizModel.find(query).populate("_class");
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
  // When create quiz, a new empty quiz record will be created
  const newQuiz = await QuizModel.create(quiz);
  const record = new QuizRecordModel({
    quiz: newQuiz._id,
    studentList: [],
  });
  QuizRecordModel.create(record);
  return newQuiz;
};

exports.updateQuiz = async (id, quiz) => {
  return await QuizModel.findByIdAndUpdate(id, quiz);
};

exports.deleteQuiz = async (id) => {
  return await QuizModel.findByIdAndDelete(id);
};
