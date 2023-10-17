const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/UserModel")
const jwt = require("jsonwebtoken")

const register = asyncHandler(async(req,res) => {
    console.log(req.body);
    const {name,email,password} = req.body;
    if(!name || !email || ! password){
        res.status(401)
        throw new Error("Enter all Credentials");

    }

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400)
        throw new Error("Üser already Exists")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user){
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new error("Invalid User");
    }
})

const login = asyncHandler(async(req,res) => {
    const{email, password} = req.body;

    if(!email || ! password){
        res.status(401)
        throw new Error("Enter email and password");
    }
    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password, user.password)){
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new error("Invalid User");
    }
})

const getMe = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    console.log({id})
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'30d'})
}

module.exports = {
    register,
    login,
    getMe
}