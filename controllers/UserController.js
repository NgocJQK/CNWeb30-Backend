const userService = require("../services/UserService");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  // try {
  //   // const quizRecords = await quizRecordService.getAllQuizRecords();
  //   // res.json({ data: quizRecords, status: "success" });
  //   const result = await userService.register(req.body);
  //   // console.log(result);
  //   if (result.status) {
  //     let userData = result.data;
  //     const { password: password, ...returnData } = userData;
  //     res.json({ data: returnData, status: "success" });
  //   } else {
  //       res.status(400).json({ error: "Register failed", message: result.message });
  //   }
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }

  try {
    const user = req.body;
    let existUser = await userService.findUserByEmail(user.email);
    if (existUser == null) {
      bcrypt
        .hash(user.password, 10)
        .then((hashedPassword) => {
          const newUser = {
            userName: user.userName,
            email: user.email,
            password: hashedPassword,
          };
          userService.createUser(newUser);
          const {password: password, ...returnData } = newUser;
          res.json({ data: returnData, status: "success" });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res.status(400).json({ message: "Email has been used" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
