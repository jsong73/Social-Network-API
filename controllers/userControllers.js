const { User, Thought} = require("../models")

module.exports = {
    //GET all users
    getUsers(req, res) {
        User.find()
        //to hide _v identifier
            .select("-__v")
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({ msg: "No user found!" });
            });
    },

    //GET single user by Id
    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            //will populate friend and thought data
            .populate("friends")
            .populate("thoughts")
            .then((userData) => {
                //if no user data return message
                if(!userData){
                    return res.status(404).json({ msg: "No user with this ID!"});
                }
                res.json(userData)
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
    },
        //CREATE (POST) new user
        createUser(req, res){
            User.create(req.body)
                .then((userData) =>{
                    res.json({ msg: "User successfully created!", userData});
                })
                .catch((err) =>{
                    console.log(err);
                    res.status(500).json(err);
                });
        },
        // UPDATE user by ID
        updateUser(req, res) {
            User.findOneAndUpdate(
                { _id: req.params.userId },
                {// $set == set new value, updating document 
                $set: req.body,
                },
                {
                //validate user ID
                runValidators: true,
                new: true,
                }
            )
            .then((userData) =>{
                if(!userData) {
                    return res.status(400).json({ msg: "No user with this ID!"})
                }
                res.json(userData);
            })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err)
                });
        },

        deleteUser(req, res) {
            User.findOneAndDelete({ _id: req.params.userId })
            .then((userData) =>{
                if(!userData) {
                    return res.status(404).json({ msg: "No user with this ID!"})
                }
                //will delete all users ids thoughts
                return Thought.deleteMany({ _id: {$in: userData.thoughts }});
            })
                .then(()=> {
                    res.json({ msg: "User and thoughts have been deleted!"})
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err)
                });
        },
        //ADD (POST) friend
        addFriend(req, res) {
            User.findOneAndUpdate({ _id: req.params.userId}, { $addToSet: {friends: req.params.friendId}}, {new: true})
                .then((userData) => {
                    if (!userData){
                        return res.status(404).jsong({ msg: "No user with this ID!"});
                    }
                    res.json({msg: "Friend added!", userData});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        },
        // DELETE friend from users friend list
        deleteFriend(req, res) {
            User.findOneAndUpdate({ _id: req.params.userId}, {$pull: { friends: req.params.friendId }}, { new: true })
                .then((userData) => {
                    if(!userData) {
                        return res.status(404).json({ msg: "No user with this ID!"});
                    }
                    res.json({ msg: "Friend deleted!", userData});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                });
        },
};