const express = require("express");
const connect = require("./configs/db.js");

const port = 8080;

const app = express();
//  To parse the request body
app.use(express.json());

const userController = require("./controllers/user.controller.js");
const { saveToken } = require("./utils/JwtUtils.js");

app.use("/users", userController);
app.get("/health_check", (req, res) => {
  return res
    .status(200)
    .send("Hi my dear friend, i am working fine don't worry");
});

app.get("/set-cookie", (req, res) => {
  // Set the cookie in the response headers
  res.cookie("cookieName", "cookieValue", { maxAge: 300000 }); // Expires after 5 minutes

  // Send a response to the client
  res.send("Cookie has been set");
});

// saveToken("token");

// ***************************************

app.listen(port, async () => {
  await connect();
  console.log(`Hai my dear friend i am listening on ${port}`);
});
