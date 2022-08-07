const User = require('../models/User');
//validate request from client
const { validationRequest } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { SECRET } = process.env;


exports.registerUser = async (req, res) => {
    const { email, password: plainPassword } = req.body
    const password = bcrypt.hash(plainPassword, 10)

    try {
        await User.create({
            firstname,
            lastname,
            email,
            password,
            userRole
        })
        console.log("User created successfully");
    } catch (error) {
        res.json({status: errror})
    }
}

//@route    GET api/auth
exports.loggedInUser = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

//@route    POST api/auth/login
//@desc     Authenticate user and get token
exports.loginUser = async (req, res) => {
    const errors = validationRequest(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email })
        if (!user)
            return res
                .status(400)
                .json({ statusCode: 400, message: "User not found" })
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res
            .status(400)
            .json({ statusCode: 400, message: "Invalid email or password" })
        
        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(
            payload,
            SECRET,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    statusCode: 200,
                    message: "Login successful",
                    user: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        userRole: user.userRole,
                        isManager: user.isManager,
                        isAdmin: user.isAdmin
                    },
                    token
                })
            }
        )


    } catch (error) {
        console.error.message;

        res.status(500).send("Server error");
    }
}