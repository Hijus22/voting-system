/**
 * Created by dave on 4/12/2016.
 */
var sqlite3 = require('sqlite3').verbose();
console.log(__filename);
var userDb = new sqlite3.Database(__dirname + '/users.db', sqlite3.OPEN_READWRITE);
/*
userDb.each('SELECT * FROM user', function (err, row) {
        console.log(row);
    },
    function (err) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        console.log('End of users dump.');
    });
*/
module.exports = userDb;
