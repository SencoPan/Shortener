const mongoose = require("mongoose");
const URL = process.env.DATABASE_URL || "mongodb://localhost:27017/urls";

module.exports = new Promise((resolve) =>
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => {
            resolve();
            console.log("Database connected")
        })
        .catch( error => {
            console.error(`Error occur when connecting to database ${error}`)
    })
);
