const userService = require("../services/UserService");

exports.register = async (req, res) => {
  try {
    // const quizRecords = await quizRecordService.getAllQuizRecords();
    // res.json({ data: quizRecords, status: "success" });
    const result = userService.register(req.body);
    if (result.status) {
      let userData = result.data;
      const { password: password, ...returnData } = userData;
      res.json({ data: returnData, status: "success" });
    } else {
        res.status(400).json({ error: "Register failed"});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
