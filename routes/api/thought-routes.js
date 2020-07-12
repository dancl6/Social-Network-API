const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
  } = require('../../controllers/thought-controller');

  router
  .route('/')
  .get(getAllThoughts)
  .put(updateThought)
  .get(getThoughtById)
  // .delete(deleteThought);

  router
  .route('/:id')
  .delete(deleteThought);

  router
  .route('/')
  .post(createThought);

  module.exports = router;