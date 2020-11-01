const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const user = async (req, res, next) => {
    try {
        const token = await req.header('cookie').replace('jwt=', '');
        const decoded = jwt.verify(token, process.env.AUTHTOKENSTRING);
        // TODO verify db token matches user token
        if (decoded) {
            next();
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = user;
