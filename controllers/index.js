const crypto = require("crypto");
const URL = require("../models/URL");

module.exports = {
    getAllUrls: async (req, res) => {
        await res.json(await URL.find());
    },
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
        res.render('shortener', {title: 'Shorterner'});
    },
    postURL: async (req, res) => {
        !req.session.userId ? req.session.userId = crypto.randomBytes(20).toString('hex') : false; //change to nanoid?

        const validation = require('../validations');

        const { body: {url}, session: {userId} } = req;
        const existingURL = await URL.findOne({URL: url});

        if( !validation(url) ) {
            res.render('shortener', {shortURL: "Введено неверное URL", type: "error"});
            return;
        } else if(existingURL){
            res.render('shortener', {shortURL: existingURL.shortVersion, type: "url"});
            return;
        }

        const shortVersion = crypto.randomBytes(5).toString('hex');
        const shortURL = await new URL({URL: url, shortVersion, userId}).save();

        res.render('shortener', {shortURL: shortURL.shortVersion , type: "url"})
    },
};