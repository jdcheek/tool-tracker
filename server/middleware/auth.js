const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.AUTHTOKENSTRING);
        if (decoded && decoded.isAdmin) {
            next()
        } else {
            console.log(`Access Denied`);
        }
    } catch (error) {
        console.log(error);
    }

};

module.exports = auth;
