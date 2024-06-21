const users = require('../models/userModel')   
const jwt = require('jsonwebtoken')

// to register
exports.registorController = async (req,res)=>{
    console.log("inside register function");
    const {username,email,password} = req.body
    console.log(username,email,password);
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            res.status(406).json("Account already exist..!! please login...")
        }else{
            const newUser = new users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
} 

//to login
exports.loginController = async (req,res) =>{
    console.log("inside register function");
    const {email,password} = req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if (existingUser) {
            //generate token on successfull login
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            res.status(404).json("Invalid cridentials")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//to display all users
exports.listUsersController = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json("No token provided");

    jwt.verify(token, process.env.JWT_PASSWORD, async (err, decoded) => {
        if (err) return res.status(401).json("Invalid token");

        try {
            const allUsers = await users.find({}, '-password'); // Exclude password field
            return res.status(200).json(allUsers);
        } catch (error) {
            return res.status(500).json("Internal server error");
        }
    });
};

//to grt details of a user
exports.getUserDetailsController = async (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json("No token provided");

    jwt.verify(token, process.env.JWT_PASSWORD, async (err, decoded) => {
        if (err) return res.status(401).json("Invalid token");

        try {
            const user = await users.findById(decoded.userId, '-password'); // Exclude password field
            if (!user) return res.status(404).json("User not found");
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json("Internal server error");
        }
    });
};