const express = require('express');
const router = express.Router();
const {createBlog, updateBlog} = require('../controllers/blog.controller');
const {verifyAndFetchUser} = require('../middlewares/verifyAndFetchUser');
const {verifyBlogCreator} = require('../middlewares/verifyBlogCreator')

router.route('/')
    .post(verifyAndFetchUser, createBlog)

router.route('/:blogId')
    .put(verifyAndFetchUser, verifyBlogCreator, updateBlog)

module.exports = router;