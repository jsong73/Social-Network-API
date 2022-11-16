const {Schema, model} = require("mongoose");

const validateEmail = function(email){
    const re =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email)
}

const userSchema = new Schema(
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
        validate: [validateEmail, "Please fill a valid email address"]
    },
    thoughts: [
        { 
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
});

const User = model("user", userSchema)


module.exports = User;