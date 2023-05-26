const express = require("express");
const {
    getAllQuizRecords,
    getQuizRecordById,
    createQuizRecord,
    updateQuizRecord,
    deleteQuizRecord
} = require("../controllers/QuizRecordController");

const router = express.Router();

router.route("/").get(getAllQuizRecords).post(createQuizRecord);
router.route("/:id").get(getQuizRecordById).put(updateQuizRecord).delete(deleteQuizRecord);

module.exports = router;