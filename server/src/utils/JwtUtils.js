const JwtToken = require("../models/jwt.model");

/**
 * This function is used to save token in the db with TTL of 5 minutes(created expiry index)
 * Token will automaticaly delete after 5 minutes when it is created
 * @param {String} jwtToken
 */
function saveToken(jwtToken) {
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

module.exports = { saveToken, removeTokenFromDb };
