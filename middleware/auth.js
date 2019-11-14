const jwt = require("jsonwebtoken");
const config = require("config");

// A middleware function that has access to the request and response of a rest call
// and a next callback function that will run once we done in order to move to the next piece of middleware
module.exports = function(req, res, next) {
    // Get token from the header
    const token = req.header("x-auth-token");

    // If token doesn't exist
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get("jwtToken"));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
