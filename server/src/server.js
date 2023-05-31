const connect = require("./configs/db.js");
const app = require("./index.js");

const port = 8080;

app.listen(port, async () => {
  await connect();
  console.log(`Hai my dear friend i am listening on ${port}`);
});
