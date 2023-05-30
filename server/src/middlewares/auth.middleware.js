import { isTokenPresentInDb } from "../utils/JwtUtils";

/**
 * Middleware to handle user authentication
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authenticateUser = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    // user -> parsed user details from given token
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

// Middleware to handle token expiration
const expireToken = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!isTokenPresentInDb(token)) {
    return res.status(401).json({ message: "Token expired" });
  }
  next();
};

module.exports = { authenticateUser, expireToken };
