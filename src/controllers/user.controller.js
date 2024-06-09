
const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function signup(req, res){
    const {username, password, email} = req.body;
    try{
        const isUserPresent = await User.findOne({email});
        if(isUserPresent){
            return res.status(400).json({
                status: false, 
                message: 'User already exists with the current Email',
                error: 'User already exists with the current Email',
            })
        }
        const cryptedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({username, password: cryptedPassword, email});
        return res.status(200).json({
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
    //extract the user details from the body
    const {email, password, username} = req.body;
    try{
        const user = await User.findOne({
            $or: [{username}, {email}]
        })
        if(!user){
            return res.status(400).json({
                status: false, 
                message: 'Password email combination is not correct',
                error: 'Password email combination is not correct',
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({
                status: false, 
                message: 'Password email combination is not correct',
                error: 'Password email combination is not correct',
            })
        }
        const authorizationToken = await jwt.sign({_id: user._id, email: user.email, username: user.username}, process.env.JWT_SECRET);
        return res.status(200).json({
            status: true, 
            message: 'User login successfull',
            token: authorizationToken,
            data: user
        })
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({
            status: false, 
            message: 'User login failed, try again later',
            error: err.message,
        })
    }

    //find the user from the email
    //compare the password through bcrypt
    //generate the jwt token | sign a token
    //handle all the error handling


    //process.env.JWT_SECRET
}

async function getUserDetails(req, res){
    res.send('user details sent')
}

module.exports = {signup, login, getUserDetails}