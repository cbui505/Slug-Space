var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth.js');

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('about');
});

module.exports = router;