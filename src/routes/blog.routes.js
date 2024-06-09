const express = require('express');
const router = express.Router();
const {createBlog} = require('../controllers/blog.controller');
const {verifyAndFetchUser} = require('../middlewares/verifyAndFetchUser')

router.route('/')
    .post(verifyAndFetchUser, createBlog)

module.exports = router;