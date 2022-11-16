const {Schema, model} = requrie("mongoose");

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type: String,
            required: true,
        },
        reactions:{
            children: [reactionSchema],
            //putting an array of subdocuments??
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model("thought", thoughtSchema)

module.exports = Thought;