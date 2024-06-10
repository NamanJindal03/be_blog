const express = require('express');
const router = express.Router();
const {createBlog, updateBlog, deleteBlog} = require('../controllers/blog.controller');
const {verifyAndFetchUser} = require('../middlewares/verifyAndFetchUser');
const {verifyBlogCreator} = require('../middlewares/verifyBlogCreator')

router.route('/')
    .post(verifyAndFetchUser, createBlog)

router.route('/:blogId')
    .put(verifyAndFetchUser, verifyBlogCreator, updateBlog)

router.route('/:blogId')
    .delete(verifyAndFetchUser, verifyBlogCreator, deleteBlog)

module.exports = router;