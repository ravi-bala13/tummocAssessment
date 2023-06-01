const express = require("express");
const cors = require("cors");
const { FRONTEND_URL } = require("./utils/Constants.js");
const session = require("express-session");

const { register, login, logout } = require("./controllers/auth.controller");
const protected = require("./controllers/protected.controller");
const userController = require("./controllers/user.controller");

const passport = require("./configs/passport");
const { expireToken } = require("./middlewares/auth.middleware");

const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: "tummoc",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use("/users", userController) // /register /login

passport.serializeUser(function ({ user, token }, done) {
  done(null, { user, token });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);

// app.use("/users", userController);
app.get("/health_check", (req, res) => {
  return res
    .status(200)
    .send("Hi my dear friend, i am working fine don't worry");
});

app.use("/testing", protected);

app.use("/users", userController);
/**
 * jwt auth
 */

app.get(
  "/protected",
  [passport.authenticate("jwt", { session: false }), expireToken],
  (req, res) => {
    return res
      .status(200)
      .send("Hi my dear friend, i am working fine don't worry");
  }
);

/**
 * Google OAuth
 */

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"], //getting email and profile
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  function (req, res) {
    res.cookie("token", req.user.token);
    return res.redirect(`${FRONTEND_URL}dashboard`);
    // return res.status(201).json({ user: req.user.user, token: req.user.token });
  }
);

app.get("/auth/google/failure", function (req, res) {
  return res.send("Something went wrong");
});

// *****************************

module.exports = app;
