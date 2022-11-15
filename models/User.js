const mongoose = require("mongoose");
import { isEmail } from "validator";

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        validate: [isEmail, "invalid email"]
    },
    thoughts: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
});

const User = model("user", userSchema)


module.exports = User;