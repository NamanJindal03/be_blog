const User = require('../models/user.models');

async function signup(req, res){
    res.send('working')
}

async function login(req, res){
    res.send('login working')
}

async function getUserDetails(req, res){
    res.send('user details sent')
}

module.exports = {signup, login, getUserDetails}