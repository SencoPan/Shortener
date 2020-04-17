const crypto = require("crypto");
const URL = require("../models/URL");

module.exports = {
    redirect: async (req, res) => {
        const {params: {shortVersion}} = req;
        const result = await URL.findOne({ shortVersion });
        if( result ){
            result.amountOfVisiting++;
            result.save();
            res.status(301).redirect(result.URL);
        } else {
            res.render('wrong', {redirect: {message:"Неверная ссылка"}})
        }
    },
    getPage: async (req, res) => {
        res.render('shortener', {title: 'Shortener'});
    },
    postURL: async (req, res) => {
        !req.session.userId ? req.session.userId = crypto.randomBytes(20).toString('hex') : false; //change to nanoid?

        const validation = require('../validations');

        const { body: {url}, session: {userId} } = req;

        if( !validation(url) ) {
            res.render('shortener', {shortURL: "Введено неверное URL"});
            return;
        }

        const shortVersion = crypto.randomBytes(5).toString('hex');
        const shortURL = await new URL({URL: url, shortVersion, userId}).save();

        delete shortURL.__v;
        delete shortURL._id;

        res.render('shortener', {shortURL})
    },
};