const express = require('express');
const {

    getAllQuizRecords,
    getQuizRecordById,
    createQuizRecord,
    updateQuizRecord,
    deleteQuizRecord,
  addStudent,
  getQuizRecordByQuizId,
} = require('../controllers/QuizRecordController');
const { recordRule } = require('../validators/QuizRecordRule');


const { validate } = require('../validators/Validator');
const router = express.Router();


// router.route("/").get(getAllQuizRecords).post(createQuizRecord);
// router
//   .route("/:id")
//   .delete(deleteQuizRecord);
router.route("/:quizId").get(getQuizRecordByQuizId).put(addStudent);
// router.route("/:id/addStudent").put(addStudent);

module.exports = router;
