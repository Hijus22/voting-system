var express = require('express');
var router = express.Router();
var connect = require('connect-ensure-login');

router.bpl=[];
router.lfp=[];
router.bl=[];
router.ucl=[];
router.extra=[];


var userDb = require('../data/userDb');

// Use when the database is created already
    //db = new sqlite3.Database('/data/users.db'); // Comment when the database is created already


/*
ENSURE USER IS LOGGED IN
 */

router.all('/*',
    connect.ensureLoggedIn('/login'),
    function(req, res, next) {
      next();
    }
);


/* Show the vote menu */

router.get('/', function(req, res, next) {
  res.render('users', {title: "Online Voting System"});

});

/* Send the votes */
router.get('/results/:comp', function(req, res, next) {

  var comp = req.params.comp;
  console.log("REQUESTING VOTES FOR " + comp);

  arr = [];
  switch (comp){
    case "bpl":
      console.log("CONTADO " + contar(router.bpl));
      res.json(contar(router.bpl));
      break;
    case "lfp":
      res.json(contar(router.lfp));
      break;
    case "bl":
      res.json(contar(router.bl));
      break;
    case "ucl":
      res.json(contar(router.ucl));
      break;
    default:
          res.send("OK");
  }

});


// Receive vote results

router.post('/',function(req, res, next) {
  console.log("RECIBO JSON");
  team = req.body.team;
  equipo = req.body.equipo;
  squad = req.body.squad;
  champ = req.body.champ;

  router.bpl.push(team);
  router.lfp.push(equipo);
  router.bl.push(squad);
  router.ucl.push(champ);
  //extra = req.body.extra;
  //extra2 = [];

  /*
  var arrayLength = extra.length;
  for (var i = 0; i < arrayLength; i++) {
    console.log("PUSHING :" + extra[i]);
    extra2.push(extra[i]);
  }
*/
  //console.log( "Extra " + extra[0]);
  //console.log(team + " " + equipo + " " + squad);

});

/* ##############################################

    DEPRECATED: DATABASE CREATION AND DATA INSERTION

   ############################################## */

// CREATE TABLE USERS
router.get('/createtable',function(req, res, next) {
  db.serialize( function(){
    db.run(
        "CREATE TABLE users ("+
        "id INTEGER PRIMARY KEY,"+
        "username TEXT,"+
        "password TEXT" + //-- hash of the plain-text password, including the salt
        ")"
    );
    res.send('CREATED')
  });
});


// DROP TABLE USERS
router.get('/droptable',function(req, res, next) {
  db.serialize( function(){
    db.run(
        "DROP TABLE users"
    );
    res.send('DELETED')
  });
});

// http://localhost:3000/users/insert?usr=foo&passwd=bar

// INSERT A USER
router.get('/insert',function(req, res, next) {
  var usr = req.query.usr;
  var hash = hashPassword(req.query.passwd);
  console.log("HASH: " + hash);
  var check = false;

  db.serialize( function insertUser() {
    db.get('SELECT username FROM users WHERE username = ?', usr, function handlerCheckUser(err, row) {
      if (!row) {
        console.log("USER NOT IN DATABASE");
        db.run("INSERT INTO users VALUES (?,?,?)", null, usr, hash, function handlerInsertUser(err, done){
          console.log("User INSERTED");
          res.send("INSERTED");
        });
      }else {
        console.log("USER ALREADY IN DATABASE")
        res.send("NOT INSERTED")
      }
    });
  });
});


/* ##############################################
              HOW TO USE SQLITE
--------------------------------------------------------

 var sqlite3 = require('sqlite3').verbose();
 var db = new sqlite3.Database(':memory:');

 db.serialize(function() {
 db.run("CREATE TABLE lorem (info TEXT)");

 var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
 for (var i = 0; i < 10; i++) {
 stmt.run("Ipsum " + i);
 }
 stmt.finalize();

 db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
 console.log(row.id + ": " + row.info);
 });
 });

 db.close();

 ############################################## */





/* ##############################################

      CRYPT FUNCTIONS

 ############################################## */

function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync("B4c0/\/", salt);
  return hash;
}

module.exports = router;

function contar(arr) {
  var a = [], b = [], prev;

  arr.sort();
  for ( var i = 0; i < arr.length; i++ ) {
    if ( arr[i] !== prev ) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length-1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}
