const Blog = require('../models/blog.models');
const User = require('../models/user.models');
const Tag = require('../models/tag.models')

async function createBlog(req, res){
    const userId = req.user._id;
    const {title, description, tag, imageUrl} = req.body;
    const documentObject = {}
    if(tag) documentObject.tag = tag;
    if(imageUrl) documentObject.imageUrl = imageUrl;

    try{
        //validating the user from the  userId
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                status: false, 
                message: 'Something went wrong',
                error: 'Something went wrong',
            })
        }
        //creation of new blog post
        const newBlogPost = await Blog.create({
            ...documentObject,
            title,
            description,
            user: user._id,
            votedBy: [],
            username: user.username,
            upVote: 0,
            downVote: 0,
            comments: []
        })

        if(tag?.length > 0){
            tag.forEach(async (tagValue) => {
                const existingTag = await Tag.findOne({categoryName: tagValue})
                if(existingTag){
                    existingTag.category.push(newBlogPost._id);
                    await existingTag.save()
                }
                const newTag = await Tag.create({categoryName: tagValue, category: [newBlogPost._id] })
            })
        }
        return res.status(200).json({
            status: true, 
            message: 'Blog succesfull created',
            data: newBlogPost
        })
        //iterating over the tags
        //chekc if the tags are present in the db
        //if they are present append the blog id
        //if they are not present create and then append blog
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({
            status: false, 
            message: 'could not create the blog',
            error: err.message,
        })
    }
}

async function updateBlog(req, res){
    const {title, description, tag, imageUrl} = req.body;
    const oldTags = req.blog.tag;

    try{
        await Blog.findByIdAndUpdate(req.blog._id, {title, description, tag, imageUrl});
        oldTags.forEach(async (tagEntry)=>{
            const tagDocument = await Tag.findOne({categoryName: tagEntry});
            if(tagDocument){
                tagDocument.category.pull(req.blog._id);
                await tagDocument.save();
            }
        })
        tag.forEach(async (tagEntry)=>{
            const tagDocument = await Tag.findOne({categoryName: tagEntry});
            if(tagDocument){
                tagDocument.category.push(req.blog._id);
                await tagDocument.save();
            }
            else{
                const newTag = await Tag.create({categoryName: tagEntry, category: [req.blog._id] })
            }
        })
        return res.status(200).json({
            status: true, 
            message: 'Blog updated succesfully',
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({
            status: false, 
            message: 'could not update the blog',
            error: err.message,
        })
    }

    //update the blog -> with the new data, 
    //get the newly created blog
    //compare oldTags and newTags to find delta
    //remove the blogId from the deletedTags
    //add the blogId on the newly added tags

    
}

async function deleteBlog(req, res){

}
module.exports = {createBlog, updateBlog}