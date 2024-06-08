const User = require('../models/user.models');

function createUser(req, res){
    //work with your User model
    console.log('trial');
    res.send('working')
}
module.exports = {createUser}