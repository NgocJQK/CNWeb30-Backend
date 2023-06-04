const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        default: () => {
            const date = new Date().toJSON();
            return `user_${date}`
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema, "user");
