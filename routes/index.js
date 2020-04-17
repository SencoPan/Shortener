const router = require('express').Router();
const controller = require('../controllers');

router.get('/', controller.getPage);

module.exports = router;