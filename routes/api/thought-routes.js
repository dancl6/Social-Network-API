const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

  router
  .route('/')
  .get(getAllThoughts)
  .put(updateThought)
  .get(getThoughtById)
  .post(createThought);

  router
  .route('/:id')
  .delete(deleteThought);

  router
  .route('/:thoughtId/reactions')
  .put(createReaction);

  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);
  
  module.exports = router;