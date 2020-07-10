const router = require('express').Router();
const userRoutes = require('./user-routes');
// const commentRoutes = require('./comment-routes');
// router.use('/comments', commentRoutes);
// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/users', userRoutes);

module.exports = router;