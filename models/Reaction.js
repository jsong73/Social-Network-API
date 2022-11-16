const { Schema } = require("mongoose")
//do i need to add Types into the require object?
const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
            ref: "Thought",
        },
        reactionBody:{
            type: String,
            required: true,
            maxlength: 280,
        },
        username:{
            type: String,
            required: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getter: true,
        },
    }
);

module.exports = Reaction;

