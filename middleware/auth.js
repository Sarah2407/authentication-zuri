// Check to see if there's a token and header
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;

module.exports = (req, res, next) => {
    //Get token fro header
    const token = req.header("Authorization");

    //Check if token doesn't exist
    if (!token)
        return res
            .status(401)
            .json({ statusCode: 401,  message: "No token, authorization denied" })
    try {
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded.user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ statusCode: 401,  message: "Invalid token" })
    }
}