const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes')

router.use('/user', userRouter);
router.use('/blog', blogRouter);

module.exports = router