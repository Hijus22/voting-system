/**
 * Created by dave on 3/6/2016.
 */
/* Sample file; not actually used;
 * Save a copy as *-private.*
 * and modify with your own private data
 * (e.g., google-private.js instead of google.js)
 * In .gitignore: *-private.*
 */

var config;
if (__filename.indexOf('-private.') !== -1) { //this is the -private file
    config = {
        secret: 'undiaviunavacavestidadeuniforme'
    };
} else { // this is the example; require the -private file
    try {
        config = require(__filename.substr(0, __filename.lastIndexOf('.')) + '-private');
    } catch (e) {
        console.log("You must copy "+__filename);
        console.log(__filename.substr(0, __filename.lastIndexOf('.')) + '-private.js');
        console.log("Then edit that file to provide your private configuration data to the app.");
        throw e;
    }
}

module.exports = config;