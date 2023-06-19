const { body } = require('express-validator');

const classService = require('../services/ClassService');

const createRule = () => {
    return [
        body('codename')
            .trim()
            .exists({ values: 'falsy' })
            .withMessage('Codename is required')
            .isString()
            .withMessage('Invalid codename'),
        body('subject')
            .trim()
            .exists({ values: 'falsy' })
            .withMessage('Subject is required')
            .isString()
            .withMessage('Invalid subject'),
        body('semester')
            .trim()
            .exists({ values: 'falsy' })
            .withMessage('Semester is required')
            .isNumeric()
            .withMessage('Invalid semester'),
        body('studentCount')
            .trim()
            .exists({ values: 'falsy' })
            .withMessage('StudentCountis required')
            .isNumeric()
            .withMessage('Invalid studentCount'),
        body('note').optional().isString().withMessage('Invalid note value'),
    ];
};

module.exports = {
    createRule,
};
