const express = require("express");
const {
    getAllQuizRecords,
    getQuizRecordById,
    createQuizRecord,
    updateQuizRecord,
    deleteQuizRecord,
    addStudent
} = require("../controllers/QuizRecordController");

const router = express.Router();

router.route("/").get(getAllQuizRecords).post(createQuizRecord);
router.route("/:id").get(getQuizRecordById).put(updateQuizRecord).delete(deleteQuizRecord);
router.route("/:id/addStudent").put(addStudent);

module.exports = router;