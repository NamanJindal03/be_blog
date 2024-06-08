const Blog = require('../models/blog.models');

function createBlog(req, res){
    res.send('working')
}
module.exports = {createBlog}