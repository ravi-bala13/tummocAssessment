const jwt = require("jsonwebtoken");

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
  verifyToken,
  newToken,
};
