var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var routes = require('./routes/index');
//var chat = require('./routes/chat');
var login = require('./routes/login');

var session = require('express-session');
var sessionSecret = require('./config/session');

var bcrypt = require('bcryptjs');
var userDb = require('./data/userDb');//sqlite3

var passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth20').Strategy
    , LocalStrategy = require('passport-local').Strategy;
var googleOAuth = require('./config/googleOAuth');

//var logout = require('express-passport-logout');



/**
 * Configure passport to log in a user
 * found in the local database.
 */
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("Attempting local login for "+username);
        userDb.get("SELECT * FROM user WHERE username=?", username, function(err, user) {
            if(err) {
                console.log("HA HABIDO UN ERROR EN EL LOGIN")
                return done(err);}
            if(!user) {
                console.log("Username `"+username+"` not found");
                return done(null, false, {message: 'Login unsuccessful'});
            }
            if(!bcrypt.compareSync(password, user.passhash)) {
                return done(null, false, {message: 'Login unsuccessful'});
            }
            console.log("Local login succesful for "+username);
            return done(null, user);
        });

    }
));

// configure Passport to use GoogleOAuth
passport.use(new GoogleStrategy({
        clientID: googleOAuth.clientID,
        clientSecret: googleOAuth.clientSecret,
        callbackURL: "http://localhost:3000/login/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        for(var prop in profile) {
            console.log('profile.'+prop + ": "+profile[prop]);
        }
        // normally, take the data from the profiles and find
        // the user account in our own app. As we
        // don't have our own user database yet; just return the profile
        return cb(null, profile);
    }
));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete OAuth user profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

var app = express();

//session setup
app.use(session({
    secret: sessionSecret.secret, // now from private config
    resave: false, //don’t bother saving if no changes
    saveUninitialized: false, //don’t bother saving if no data
    cookie: { maxAge: 1000*60*60*24*3 } // allow three days before logging in again
}));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//consider authentication first, then app functions
//app.use('/login', login);
app.use('/login', login);
app.use('/users', users);
app.use('/', routes);


//app.use('/', routes);
//app.use('/users', users);
//app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;