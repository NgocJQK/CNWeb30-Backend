const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
  {
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      default: () => {
        let t = Date.now;
        t.setMinutes(t.getMinutes + 15);
        return t;
      },
    },
    formLink: {
      type: String,
      default: "",
    },
    _class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },
    // classId: {
    //   type: String,
    //   default: "",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema, "quiz");
