const { isTokenPresentInDb } = require("../utils/JwtUtils");

// Middleware to handle token expiration
const expireToken = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log("req.headers.authorization:", req.headers.authorization);
  // console.log("token:", token);

  if (!isTokenPresentInDb(token)) {
    return res.status(401).json({ message: "Token expired" });
  }
  return next();
};

module.exports = { expireToken };
