const ClassModel = require("../models/Class");

exports.getAllClasses = async () => {
    return await ClassModel.find();
}

exports.getClassById = async (id) => {
    return await ClassModel.findById(id);
}

exports.createClass = async (_class) => {
    return await ClassModel.create(_class);
}

exports.updateClass = async (id, _class) => {
    return await ClassModel.findByIdAndUpdate(id, _class);
}

exports.deleteClass = async (id) => {
    return await ClassModel.findByIdAndDelete(id);
}