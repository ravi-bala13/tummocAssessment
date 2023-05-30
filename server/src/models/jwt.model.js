const mongoose = require("mongoose");

const JwtSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expiration: { type: Date, required: true, index: { expires: "5m" } },
});

// create table in a database
const JwtToken = mongoose.model("jwt_token", JwtSchema); // tablename will be jwt_tokens

module.exports = JwtToken;
