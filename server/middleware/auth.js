const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
    // try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.AUTHTOKENSTRING);
    console.log(decoded);
    // verify token with jwt

    if (decoded.isAdmin) {
        next()
    }


    //     const user = await User.findOne({
    //         _id: decoded._id,
    //         "tokens.token": token,
    //     });
    //     if (user) {
    //         req.token = token;
    //         req.user = user;
    //         next();
    //     } else {
    //         throw new Error();
    //     }
    // } catch (error) {
    //     res.status(401).send({ error: "Please authenticate." });
    // }
};

module.exports = auth;
