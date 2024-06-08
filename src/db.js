const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_local')
    .then(()=> console.log('blog local db succesfully connected'))
    .catch((err)=> console.log('error connecting the database', err))