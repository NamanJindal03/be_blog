const User = require('../models/user.models');

function createUser(req, res){
    res.send('working')
}
module.exports = {createUser}