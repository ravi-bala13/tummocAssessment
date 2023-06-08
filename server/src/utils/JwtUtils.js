const JwtToken = require("../models/jwt.model");
const jwt = require("jsonwebtoken");

/**
 * This function is used to save token in the db with TTL of 5 minutes(created expiry index)
 * Token will automaticaly delete after 5 minutes when it is created
 * @param {String} jwtToken
 */
async function saveToken(jwtToken) {
  try {
    const token = new JwtToken({
      token: jwtToken,
      expiration: Date.now(),
    });

    token.save();
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Failed to save token:", error);
  }
}

/**
 * This function is used to delete token from the db
 * @param {String} token
 */

// Function to delete a token by its value
async function removeTokenFromDb(tokenValue) {
  try {
    const deletedToken = await JwtToken.findOneAndDelete({
      token: tokenValue,
    });
    if (deletedToken) {
      console.log("Token deleted:", deletedToken);
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.error("Error deleting token:", error);
  }
}

/**
 * This function is used to check token present in db or not
 * @param {String} token
 * @returns {Boolean}
 */
async function isTokenPresentInDb(token) {
  try {
    const tokenFromDb = await JwtToken.findOne({ token: token });
    if (tokenFromDb) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error in isTokenPresentInDb:", error);
  }
}

const newToken = (user) => {
  return jwt.sign(
    { user: user },
    process.env.JWT_ACCESS_KEY || JWT_ACCESS_KEY,
    { expiresIn: "5m" }
  );
};

// Verify JWT and check if it has expired
const verifyToken = (token) => {
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token has expired");
      } else {
        console.log("Invalid token");
      }
    } else {
      console.log("Token is valid");
      console.log("Decoded payload:", decoded);
    }
  });
};

module.exports = {
  saveToken,
  removeTokenFromDb,
  isTokenPresentInDb,
  verifyToken,
  newToken,
};
