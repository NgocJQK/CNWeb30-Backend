const { default: mongoose } = require("mongoose");
const ClassModel = require("../models/Class");
const QuizService = require("../services/QuizService");

// Attempt to reuse the group function for future grouping (if any)
/**
 * @param {mongoose.Schema} model mongoose Schema model
 * @param {array} list the original list
 * @param {String} property property to broup by
 * @param {String} arrayName the name of the new array of each group
 * @returns {array}
 */
const groupBy = async (model, list, property, arrayName) => {
  // initialize return list
  let returnData = await model.aggregate().group({
    _id: `$${property}`,
  });
  returnData.map((data) => {
    data[`${property}`] = data["_id"];
    delete data["_id"];
    data[arrayName] = [];
  });

  // put items from old array to new array inside return list
  list.map((oldItem) => {
    returnData.map((newItem) => {
      if (oldItem[`${property}`] === newItem[`${property}`]) {
        newItem[arrayName].push(oldItem);
      }
    });
  });

  return returnData;
};

exports.getAllClasses = async (filters = null) => {
  let classes = await ClassModel.find();
  let quizzes = await QuizService.getAllQuizzes();

  // add quizzes to class
  let classObjs = [];
  classes.map((_class) => {
    classObj = _class.toObject()

    // get quiz by class and remove _class property in quiz
    let foundQuizzes = quizzes.filter(
      (quiz) => quiz._class._id.toString() == _class._id.toString()
    ).map((quiz) => {
      // remove _class property in quiz
      const {_class, ...returnQuiz} = quiz;
      return returnQuiz;
    });

    classObj["quizzes"] = foundQuizzes;
    classObjs.push(classObj);
  });

  if (filters) {
    if ("groupBy" in filters) {
      if (filters.groupBy === "semester") {
        // This part was generalized in the groupBy function
        // This is kept for code understanding
        // // get semesters
        // let semesters = await ClassModel.aggregate().group({
        //   _id: "$semester",
        // });
        // semesters.map((semester) => {
        //   semester["semester"] = semester["_id"];
        //   delete semester["_id"];
        //   semester._classes = [];
        // });

        // // list classes
        // classes.map((_class) => {
        //   semesters.map((semester) => {
        //     if (_class.semester === semester.semester) {
        //       semester._classes.push(_class.toObject());
        //     }
        //   });
        // });

        // return semesters;
        return await groupBy(ClassModel, classObjs, filters.groupBy, "_classes");
      }
    }
  }
  // return await ClassModel.find();
  return classObjs;
};

exports.getClassById = async (id) => {
  return await ClassModel.findById(id);
};

exports.createClass = async (_class) => {
  return await ClassModel.create(_class);
};

exports.updateClass = async (id, _class) => {
  return await ClassModel.findByIdAndUpdate(id, _class);
};

exports.deleteClass = async (id) => {
  let deleteQuizzes = await QuizService.getAllQuizzes({_class: id});
  deleteQuizzes.map(quiz => {
    QuizService.deleteQuiz(quiz._id);
  })
  return await ClassModel.findByIdAndDelete(id);
};
