const User = require("../models/User");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.secretKey =
  "Dg6ooDLEvh5BJKZNEXI4tByo8DRWNto9bP6tMoWMIqnTJWkSKdccq6M2pqPeqMOHPmHHnQqtWlG77cxyHJ6A3Kt7JfFxGAcjsB1NjaJZukzLhNSnaSTCYtvVyGKwVKUv";

exports.findUserByEmail = async (email) => {
  return await UserModel.findOne({ email: `${email}` });
};

exports.createUser = async (user) => {
  return await UserModel.create(user);
}