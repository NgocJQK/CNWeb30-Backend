const express = require('express');
const {
    getAllQuizRecords,
    getQuizRecordById,
    createQuizRecord,
    updateQuizRecord,
    deleteQuizRecord,
} = require('../controllers/QuizRecordController');
const { recordRule } = require('../validators/QuizRecordRule');

const { validate } = require('../validators/Validator');
const router = express.Router();

router.route('/').get(getAllQuizRecords).post(recordRule(), validate, createQuizRecord);
router.route('/:id').get(getQuizRecordById).put(updateQuizRecord).delete(deleteQuizRecord);
module.exports = router;
