module.exports = {
    getPage: async (req, res) => {
      res.render('shortener', {title: 'Shortener'});
    },
    postURL: async (req, res) => {
        const { body: {url} } = req;
        const URL = require("../models/URL");
        res.end();
    },
};