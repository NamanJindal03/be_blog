const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/prod1')
    .then(()=> console.log('prod1 db succesfully connected'))
    .catch((err)=> console.log('error connecting the database', err))