const router = require("express").Router();

const{
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require("../../controllers/thoughtControllers")

// /api/thoughts
router.route("/").get(getThoughts);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction).delete(deleteReaction);

module.exports = router;