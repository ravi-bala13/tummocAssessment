// const connect = require("./configs/db.js");
// const app = require("./index.js");

// const session = require("express-session");
// const MongoStore = require("connect-mongo"); //using for session store
// const mongoose = require("mongoose");
// require("dotenv").config();

// const port = 8080;

// app.listen(port, async () => {
//   await connect();
//   console.log(`Hai my dear friend i am listening on ${port}`);

//   app.use(
//     session({
//       secret: "tummoc",
//       resave: false,
//       saveUninitialized: true,
//       store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
//   );
// });

// (async () => {
//   try {
//     await connect(); // Establish the database connection
//     console.log("Connected to MongoDB");

//     const store = MongoStore.create({
//       mongoUrl: process.env.MONGO_DB_CONNECTION_URL,
//       mongooseConnection: mongoose.connection,
//       collectionName: "sessions",
//     });

//     app.use(
//       session({
//         secret: "tummoc",
//         resave: false,
//         saveUninitialized: true,
//         store,
//       })
//     );

//     // Rest of your code
//     app.listen(8080, () => {
//       console.log("Server listening on port 8080");
//     });
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//   }
// })();
