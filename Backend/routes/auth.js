const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

function isAuthorized(req, res, next) {
  try {
    jwt.verify(req.body.accessToken, process.env.JWT_SECRET).userId;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = isAuthorized;
