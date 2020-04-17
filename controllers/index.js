module.exports = {
    getPage: async (req, res) => {
      res.render('shortener', {title: 'Shortener'});
  }
};