const classService = require("../services/ClassService");

exports.getAllClasses = async (req, res) => {
  try {
    const _classs = await classService.getAllClasses();
    res.json({ data: _classs, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createClass = async (req, res) => {
  try {
    const _class = await classService.createClass(req.body);
    res.json({ data: _class, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const _class = await classService.getClassById(req.params.id);
    res.json({ data: _class, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const _class = await classService.updateClass(req.params.id, req.body);
    res.json({ data: _class, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const _class = await classService.deleteClass(req.params.id);
    res.json({ data: _class, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};