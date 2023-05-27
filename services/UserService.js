const User = require("../models/User");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

exports.findUserByEmail = async (email) => {
  return await UserModel.findOne({ email: `${email}` });
};

exports.register = async (user) => {
  try {
    let existUser = this.findUserByEmail(user.email);
    if (existUser == null) {
      bcrypt
        .hash(user.password, 10)
        .then((hashedPassword) => {
          const newUser = new User({
            userName: user.userName,
            email: user.email,
            password: hashedPassword,
          });
          return { status: true, data: UserModel.create(newUser) };
        })
        .catch((e) => {
          return { status: false, message: e.message };
        });
    } else {
      return { status: false, message: "Email has been used" };
    }
  } catch (e) {
    return { status: false, message: e.message };
  }
};

exports.login = async (user) => {
  try {
    this.findUserByEmail(user.email)
      .then((existUser) => {
        bcrypt.compare(user.password, existUser.password).then().catch();
      })
      .catch(() => {
        return { status: false };
      });
  } catch (e) {
    return { status: false, message: e.message };
  }
};
