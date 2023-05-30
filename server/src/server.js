const express = require("express");
const connect = require("./configs/db.js");

const port = 8080;

const app = express();
//  To parse the request body
app.use(express.json());

const userController = require("./controllers/user.controller.js");

app.use("/users", userController);
app.get("/health_check", (req, res) => {
  return res
    .status(200)
    .send("Hi my dear friend, i am working fine don't worry");
});

// ***************************************

app.listen(port, async () => {
  await connect();
  console.log(`Hai my dear friend i am listening on ${port}`);
});
