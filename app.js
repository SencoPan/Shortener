const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const database = require("./config/database");

const shorternerRouter = require("./routes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    name: "session",
    sameSite: true,
    keys: [process.env.COOKIE_KEY],
    secret: process.env.COOKIE_SECRET,
    maxAge: 8 * 60 * 60 * 1000, // 1 hour
  })
);

app.use("/", shorternerRouter);

/*
const crypto = require('crypto');
let alphabit = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let good = [];
let bad = alphabit.split('');
for(let i = 0; i < 40; i++){
    const tes = crypto.randomBytes(7).toString("base64");
    tes.split('').forEach( char => {
        bad.indexOf(char) === -1 ? good.push(char) : false;
    })
}
console.log(good.reduce((accumulator, res) => {
    console.log(accumulator, res);
    accumulator.split('').indexOf(res) === -1 ? accumulator += res : false;
    return accumulator;
}));
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "error" });
});

module.exports = new Promise((resolve) => {
  database.then(() => {
    resolve(app);
  });
});
