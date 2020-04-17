const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.getPage);
router.post('/', controller.postURL);
router.get('/:shortVersion', controller.redirect)
module.exports = router;