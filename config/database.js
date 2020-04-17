const mongoose = require("mongoose");
const URL = process.env.DATABASE_URL || "mongodb://localhost:27017/urls";

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

module.exports = new Promise((resolve) =>
    mongoose.connect(URL)
        .then( () => {
            resolve();
            console.log("Database connected")
        })
        .catch( error => {
            console.error(`Error occur when connecting to database ${error}`)
    })
);
