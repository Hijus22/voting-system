/**
 * Created by Hijus on 12/5/16.
 */

// SET A COOKIE
$(document).ready(function(){
    // Cookie setting script wrapper
    var cookieScripts = function () {
        // Internal javascript called
        console.log("Running");
    }

    /* Call cookiesDirective, overriding any default params

     *** These are the defaults ***
     explicitConsent: true,
     position: 'top',
     duration: 10,
     limit: 0,
     message: null,
     cookieScripts: null,
     privacyPolicyUri: 'privacy.html',
     scriptWrapper: function(){},
     fontFamily: 'helvetica',
     fontColor: '#FFFFFF',
     fontSize: '13px',
     backgroundColor: '#000000',
     backgroundOpacity: '80',
     linkColor: '#CA0000'

     */

    $.cookiesDirective({
        privacyPolicyUri: 'myprivacypolicy.html',
        explicitConsent: false,
        position : 'bottom',
        scriptWrapper: cookieScripts,
        cookieScripts: 'Google Analytics, My Stats Ultimate ',
        backgroundColor: '#52B54A',
        linkColor: '#ffffff'
    });

});
