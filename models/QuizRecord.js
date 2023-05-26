const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const quizSchema = require("./Quiz")

const quizRecordSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        default: null
    },
    studentId: {
        type: String,
        default: "20001234"
    },
    studentName: {
        type: String,
        default: "Nguyễn Văn A"
    },
    isValid: {
        type: Boolean,
        default: true
    },
    note: {
        type: String,
        default: ""
    }
}, {
  timestamps: true
});

module.exports = mongoose.model("QuizRecord", quizRecordSchema, "quizRecord");
