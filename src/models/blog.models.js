const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    description: {
        type: String,
        required: true,
        minLength: 3
    },
    tag: {
        type: [String],
        default: ['General'],
        required: true
    },
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    imageURL: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    votedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, 
    {timestamps: true}
)

module.exports = mongoose.model('Blog', blogSchema )