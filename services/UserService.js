const User = require("../models/User");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey =
  "Dg6ooDLEvh5BJKZNEXI4tByo8DRWNto9bP6tMoWMIqnTJWkSKdccq6M2pqPeqMOHPmHHnQqtWlG77cxyHJ6A3Kt7JfFxGAcjsB1NjaJZukzLhNSnaSTCYtvVyGKwVKUv";

exports.findUserByEmail = async (email) => {
  return await UserModel.findOne({ email: `${email}` });
};

exports.createUser = async (user) => {
  return await UserModel.create(user);
}

exports.register = async (user) => {
  // try {
  //   let existUser = this.findUserByEmail(user.email);
  //   if (existUser == null) {
  //     bcrypt
  //       .hash(user.password, 10)
  //       .then((hashedPassword) => {
  //         const newUser = new User({
  //           userName: user.userName,
  //           email: user.email,
  //           password: hashedPassword,
  //         });
  //         return { status: true, data: UserModel.create(newUser) };
  //       })
  //       .catch((e) => {
  //         return { status: false, message: e.message };
  //       });
  //   } else {
  //     return { status: false, message: "Email has been used" };
  //   }
  // } catch (e) {
  //   return { status: false, message: e.message };
  // }
  let existUser = await this.findUserByEmail(user.email);
  if (existUser == null) {
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
      const newUser = new User({
        userName: user.userName,
        email: user.email,
        password: hashedPassword,
      });
    });
    return { status: true, data: UserModel.create(newUser), message: "" };
  } else {
    return { status: false, data: null, message: "Existed email" };
  }
};

exports.login = async (user) => {
  // try {
  //   this.findUserByEmail(user.email)
  //     .then((existUser) => {
  //       bcrypt
  //         .compare(user.password, existUser.password)
  //         .then((passwordCheck) => {
  //           if (!passwordCheck) {
  //             return { status: false, token: "" };
  //           }

  //           const token = jwt.sign(
  //             {
  //               userId: user._id,
  //               userEmail: user.email,
  //             },
  //             secretKey,
  //             {
  //               expiresIn: "24h",
  //             }
  //           );

  //           return { status: true, token: token };
  //         })
  //         .catch(() => {
  //           return { status: false, token: "" };
  //         });
  //     })
  //     .catch(() => {
  //       return { status: false, token: "" };
  //     });
  // } catch (e) {
  //   return { status: false, message: e.message };
  // }
  this.findUserByEmail(user.email).then((existUser) => {
    bcrypt.compare(user.password, existUser.password).then((passwordCheck) => {
      if (!passwordCheck) {
        return { status: false, token: "" };
      }

      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        secretKey,
        {
          expiresIn: "24h",
        }
      );

      return { status: true, token: token };
    });
  });
};
