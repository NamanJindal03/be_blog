
const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function signup(req, res){
    const {username, password, email} = req.body;
    try{
        const isUserPresent = await User.findOne({email});
        if(isUserPresent){
            res.status(400).json({
                status: false, 
                message: 'User already exists with the current Email',
                error: 'User already exists with the current Email',
            })
        }
        const cryptedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({username, password: cryptedPassword, email});
        res.status(200).json({
            status: true, 
            message: 'User signedup succesfully',
            data: newUser
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({
            status: false, 
            message: 'User could not be created, please try again later',
            error: err.message,
        })
    }
}

async function login(req, res){
    res.send('login working')
    //extract the user details from the body
    //find the user from the email
    //compare the password through bcrypt
    //generate the jwt token | sign a token
    //handle all the error handling
}

async function getUserDetails(req, res){
    res.send('user details sent')
}

module.exports = {signup, login, getUserDetails}