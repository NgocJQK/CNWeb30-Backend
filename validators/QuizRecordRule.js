const { body } = require('express-validator');

const quizRecordService = require('../services/QuizRecordService');

const recordRule = () => {
    return [
        body('studentId')
            .trim()
            .exists({ value: 'falsy' })
            .withMessage('StudentId is required')
            .isNumeric()
            .withMessage('Invalid studentId'),
        body('studentName').trim().exists({ value: 'falsy' }).withMessage('StudentName is required'),
        // body('isValid').optional().isBoolean().withMessage('Invalid isValid value'),
        body('note').optional().isString().withMessage('Invalid note value'),
    ];
};

module.exports = {
    recordRule,
};
