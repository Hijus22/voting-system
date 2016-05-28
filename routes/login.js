/**
 * Created by Hijus on 10/5/16.
 */

var express = require('express');
var router = express.Router();


var passport = require('passport')
var userDb = require('../data/userDb');
var bcrypt = require('bcryptjs');

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('login',{title: "Log in"});
});

/* POST (attempt) login */
router.post('/', passport.authenticate('local',
    {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/');
    }
);
/*
router.post('/', passport.authenticate('local',
    {
        successReturnToOrRedirect: '/register',
        failureRedirect: '/login'
    })
);*/

/**
 *  Logout from the current session
 */
router.get('/logout', function (req, res, next){
    var returnTo = req.query.returnTo;

    //delete req.session;
    req.session.destroy();
    return res.redirect('/login');

});

/**
 * GET Registration page
 */
router.get('/register', function (req, res, next) {
    console.log('Getting register page');
    res.render('register', {title: 'Register for voting'});
});

/**
 * POST a new registration
 */
router.post('/register', function (req, res, next) {
    console.log('POST register page');
    userDb.serialize( function selectUsers(){
        userDb.each('SELECT * FROM user', function (err, row) {
                console.log(row);
            },
            function (err) {
                if (err) {
                    console.log("ERROR: " + err.message);
                }
                console.log('End of users dump.');
            });

        console.log("USERNAME: "+ req.body.username + " DISPLAYNAME: " + req.body.displayName + "PASS: " + req.body.password);
        userDb.run("INSERT INTO user(username, displayName, passhash) VALUES(?,?,?)",
            req.body.username, req.body.displayName, bcrypt.hashSync(req.body.password),
            function (err) {
                if(err) { // problem
                    console.log(err.message);
                    console.log("USER NOT REGISTERED");
                    res.redirect('/login/register');
                } else { // go to home page
                    console.log("USER REGISTERED");
                    res.redirect('/');
                }
            }
        );
    });
});


module.exports = router;
