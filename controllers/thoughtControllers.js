const { User, Thought } = require("../models")

module.exports = {
// GET all thoughts
    getThoughts(req, res) {
        Thought.find()
        //sort in descending order 
        .sort({ createdAt: -1 })
        .then((userData) => {
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // GET single thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((userData) => {
                if (!userData) {
                    return res.status(404).json({ msg: "No thought with this ID!"})
                }
                res.json(userData);
            })
            .catch((err) =>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    //CREATE (POST) thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((userData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    // appends thoughts by userID to an array.
                    { $push: {thoughts: userData._id} },
                    //returns newly updated obj instead of original
                    {new: true}
                );
            })
            ,then((userData) => {
                if(!userData){
                    return res.status(404).json({ msg: "Thought created but no user with this ID found!" })
                }
                res.json({ msg: "Thought successfully created!" })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });           
    },
    //UPDATE (PUT) thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
            .then((userData) => {
                if(!userData) {
                    return res.status(404).json({ msg: "No thought with this ID!" })
                }
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).jsong(err);
            });
    },
    // DELETE thought by ID
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((userData) => {
                if(!userData){
                    return res.status(404).json({ msg: "No thought with this ID!" })
                }
                // removes thought ID from users thought field
                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                );
            })
            .then((userData) =>{
                if(!userData){
                    return res.status(404).json({ msg: "Thought created but no user with this ID!" });
                }
                res.json({ msg: "Thought successfully deleted!" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // ADD (POST) reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            //  adds reaction to array field
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        )
            .then((userData) => {
                if(!userData) {
                    return res.status(404).json({ msg: "No thought with this ID!" })
                }
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // DELETE reaction by reaction ID
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
            .then((userData) => {
                if(!userData){
                    return res.json(404).json({ msg: "No thought wiht this ID!" });
                }
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};