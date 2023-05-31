const express = require("express");
const cors = require("cors");

const { register, login, logout } = require("./controllers/auth.controller");

const passport = require("./configs/passport");
const { expireToken } = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
// app.use("/users", userController) // /register /login

passport.serializeUser(function ({ user, token }, done) {
  done(null, { user, token });
});

passport.deserializeUser(function (user, done) {
  done(err, user);
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

// app.use("/testing", protected);
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
    console.log("req:", req);
    return res.status(201).json({ user: req.user.user, token: req.user.token });
  }
);

app.get("/auth/google/failure", function (req, res) {
  return res.send("Something went wrong");
});

// *****************************

module.exports = app;
