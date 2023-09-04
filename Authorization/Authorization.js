const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req, res, next) => {
    console.log("auth");

    try {
        // searching for token into headers
        const token = req.headers.authorization
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        console.log("auth sucessful");

        next();

    }
    catch {

        res.status(400).send("Authentication failed");
        console.log("Authentication failed")

    }

}

module.exports = authentication