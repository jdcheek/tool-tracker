const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {

    try {
        const token = await req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.AUTHTOKENSTRING);
        if (decoded) {
            console.log(decoded, token);
            next()
        } else {
            res.status(401).send('Unauthorized')
        }
    } catch (error) {
        res.status(400).send(error);
    }

};

module.exports = auth;
