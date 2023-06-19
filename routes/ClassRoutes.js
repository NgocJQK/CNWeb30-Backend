const express = require('express');
const {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
} = require('../controllers/ClassController');
const { createRule } = require('../validators/ClassRule');
const { validate } = require('../validators/Validator');
const router = express.Router();

router.route('/').get(getAllClasses).post(createRule(), validate, createClass);
router.route('/:id').get(getClassById).put(updateClass).delete(deleteClass);
module.exports = router;
