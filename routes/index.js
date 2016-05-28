var express = require('express');
var router = express.Router();
var connect = require('connect-ensure-login');

/*
 * ENSURE USER IS LOGED IN
 */


router.all('/*',
    connect.ensureLoggedIn('/login'),
    function(req, res, next) {
      next();
    }
);

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("PIDO INDEX");
  res.render('index', { title: 'Welcome to the voting system' });
});

module.exports = router;
