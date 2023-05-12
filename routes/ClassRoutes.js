const express = require("express");
const {
    getAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass
} = require("../controllers/ClassController");

const router = express.Router();

router.route("/").get(getAllClasses).post(createClass);
router.route("/:id").get(getClassById).put(updateClass).delete(deleteClass);

module.exports = router;