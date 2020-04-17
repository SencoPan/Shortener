const database = require("mongoose");

const { Schema } = database;

const URLSchema = new Schema({
  URL: { type: String, required: true, unique: true },
  shortVersion: { type: String, required: true, unique: true },
  amountOfVisiting: { type: Number, default: 0 },
  userId: { type: String, required: true },
});

module.exports = database.model("urls", URLSchema);
