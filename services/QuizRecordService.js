const QuizRecordModel = require("../models/QuizRecord");
const QuizService = require("./QuizService");

exports.getAllQuizRecords = async (filters = null) => {
  let query = {};
  if (filters) {
    if ("quiz" in filters) {
      query.quiz = filters.quiz;
    }
  }
  return await QuizRecordModel.find(query);
};

exports.getQuizRecordById = async (id) => {
  return await QuizRecordModel.findById(id);
};

exports.createQuizRecord = async (quizRecord) => {
  return await QuizRecordModel.create(quizRecord);
};

exports.updateQuizRecord = async (id, quizRecord) => {
  return await QuizRecordModel.findByIdAndUpdate(id, quizRecord);
};

exports.deleteQuizRecord = async (id) => {
  return await QuizRecordModel.findByIdAndDelete(id);
};

exports.getQuizRecordByQuizId = async (quizId) => {
  return await QuizRecordModel.findOne({ quiz: `${quizId}` });
};

// This part was scrapped since front will handle all of these
// const checkRecordValidTime = async (quiz, createAt) => {
//   // const currentTime = new Date().getTime();
//   const quizStartTime = quiz.startTime.getTime();
//   const quizEndTime = quiz.endTime.getTime();
//   let status;
//   if (createAt < quizStartTime) {
//     status = false;
//   } else if (quizEndTime < createAt) {
//     status = false;
//   } else {
//     status = true;
//   }
//   // quiz.status = status;
//   return status;
// };
// const processStudentInput = async (quiz, studentInput) => {
//   let recordNote = studentInput.note;
//   let studentRecord = {
//     studentId: studentInput.studentId,
//     studentName: studentInput.studentName,
//     isValid:  () => {
//       // case 1: already false (wrong location), wrong time   => false
//       // case 2: already false (wrong location), right time   => false
//       // case 3: true (right location), right time            => true
//       // case 4: true (right location), wrong time            => false
//       if (isValid) {
//         if (!checkRecordValidTime(quiz, studentInput.createAt)) {
//           recordNote += " Wrong time";
//           return false;
//         }
//       }
//       return studentInput.isValid;
//     },
//     note: recordNote,
//     createAt: studentInput.createAt,
//   };
//   return studentRecord;
// };

exports.addStudent = async (quizId, studentInput) => {
  // let record = await getQuizRecordByQuizId(quizId);
  // let quiz = await QuizService.getQuizById(quizId);
  // let studentRecord = {};
  // if (record && quiz) {
  //   studentRecord = processStudentInput(quiz, studentInput);
  //   record.studentList.push(studentRecord);
  //   this.updateQuizRecord(record.id, record);
  // }
  // return studentRecord;
  
  let record = await this.getQuizRecordByQuizId(quizId);
  record.studentList.push(studentInput);
  return await this.updateQuizRecord(record._id, record);
};
