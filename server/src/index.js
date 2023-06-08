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
// var corsOptions = {
//   origin: ["http://localhost:3000"],
//   Credential: true,
// };
// app.use(cors(corsOptions));

app.use(
  cors({
    origin: ["https://tummoc-assessment.vercel.app", "http://localhost:3000"],
    credentials: true, // Enable sending cookies across origins
  })
);

app.options("*", cors()); // Enable preflight requests for all routes

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

// app.use("/users", userController);
app.get("/", (req, res) => {
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

app.get("/auth/google/login", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      token: req.user.token,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

app.get("/auth/google/logout", (req, res) => {
  console.log("req:", req.user.token);
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to destroy session" });
    }

    // Clear any relevant session data or user information
    return res.redirect(`${FRONTEND_URL}dashboard`);
  });
});

// *****************************

module.exports = app;
