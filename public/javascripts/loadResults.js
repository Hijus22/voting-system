/**
 * Created by Hijus on 12/5/16.
 */
$(function () {
    var displayResults = function () {
        "use strict";
        var bpl = [],
            lfp = [],
            bl = [],
            ucl = [];


        $.getJSON('/users/results/bpl', function (data) {
            bpl.push("<li> Barclays Premier League </li>");
            bpl.push("<li>" + data[0] + " - number of votes: " + data[1] + " </li>");
            console.log("ESTO SON LOS RESULTS" + bpl);
            if (bpl.length > 1){
                $("#bpl").html("<ol>" + bpl.join(" ") + "</ol>");
            }
            else{
                $("#bpl").html("<ol>" + bpl+ "</ol>");
            }
        });

        $.getJSON('/users/results/lfp', function (data) {
            lfp.push("<li> Liga de Futbol Profesional </li>");
            lfp.push("<li>" + data[0] + " - number of votes: " + data[1] + " </li>");
            console.log("ESTO SON LOS RESULTS" + lfp);
            if (lfp.length > 1){
                $("#lfp").html("<ol>" + lfp.join(" ") + "</ol>");
            }
            else{
                $("#lfp").html("<ol>" + lfp+ "</ol>");
            }
        });

        $.getJSON('/users/results/bl', function (data) {
            bl.push("<li> Bundesliga </li>");
            bl.push("<li>" + data[0] + " - number of votes: " + data[1] + " </li>");
            console.log("ESTO SON LOS RESULTS" + bl);
            if (bl.length > 1){
                $("#bl").html("<ol>" + bl.join(" ") + "</ol>");
            }
            else{
                $("#bl").html("<ol>" + bl+ "</ol>");
            }
        });

        $.getJSON('/users/results/ucl', function (data) {
            ucl.push("<li> UEFA Champions League </li>");
            ucl.push("<li>" + data[0] + " - number of votes: " + data[1] + " </li>");
            console.log("ESTO SON LOS RESULTS" + ucl);
            if (ucl.length > 1){
                $("#ucl").html("<ol>" + ucl.join(" ") + "</ol>");
            }
            else{
                $("#ucl").html("<ol>" + ucl+ "</ol>");
            }
        });


    };


    setInterval(displayResults, 5000);//Load Results of votes every 5 seconds.
});