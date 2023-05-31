require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { uuid } = require("uuidv4");

const User = require("../models/user.model");
const JwtToken = require("../models/jwt.model");
const { newToken } = require("../controllers/auth.controller");
const {
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  JWT_ACCESS_KEY,
} = require("../utils/Constants");

// Google OAuth strategy configuration
const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
  passReqToCallback: true,
};
/**
 * using google strategy
 */
passport.use(
  new GoogleStrategy(googleOptions, async function (
    request,
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    console.log("profile:", profile);
    let user = await User.findOne({ email: profile?._json?.email })

      .lean()
      .exec();

    if (!user) {
      user = await User.create({
        email: profile?._json?.email,
        password: uuid(),
      });
    }
    console.log("user:", user);
    const token = newToken(user);
    return done(null, { user, token });
  })
);

// JWT strategy configuration
const jwtOptions = {
  secretOrKey: process.env.JWT_ACCESS_KEY || JWT_ACCESS_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

/**
 * using jwt strategy
 */
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user based on the payload (e.g., user ID)
      const user = await User.findById(payload.user._id);
      console.log("user:", user);

      if (user) {
        // If the user is found, pass it to the next middleware
        return done(null, user);
      } else {
        // If the user is not found, handle the authentication failure
        return done(null, false);
      }
    } catch (error) {
      // Handle any errors that occur during verification
      return done(error, false);
    }
  })
);

function extractTokenFromHeader(req) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.substring(7); // Remove 'Bearer ' from the header value
    return token;
  }
  return null;
}

module.exports = passport;
