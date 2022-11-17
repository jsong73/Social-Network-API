const router = require("express").Router();

const {
 getUsers,
 createUser,
 getSingleUser,
 updateSingleUser,
 deleteUser,
 getFriends,
 createFriend,
 deleteFriend
} = require("../../controllers/userControllers")

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateSingleUser).delete(deleteUser);

// api/users/:userId/friends
router.route("/:userId/friends").get(getFriends);

// api/users/:userId/friends/:friendId
router.route("/api/users/:userId/friends/:friendId").post(createFriend).delete(deleteFriend);

module.exports = router;