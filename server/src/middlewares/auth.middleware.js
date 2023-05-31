const { isTokenPresentInDb } = require("../utils/JwtUtils");

// Middleware to handle token expiration
const expireToken = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const isPresent = await isTokenPresentInDb(token);
  if (!isPresent) {
    return res.status(401).json({ message: "Token expired" });
  }
  return next();
};

module.exports = { expireToken };
