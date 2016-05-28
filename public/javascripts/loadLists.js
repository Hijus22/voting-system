$(function(){
    $('#centro').append(
        '<div class="back">' +
        '<div class="button_base b03_skewed_slide_in">' +
        '<div>START</div>' +
        '<div></div>' +
        '<div data-start>LET\'S GO!</div>' +
        '</div>' +
        '</div>'
    );
    $('div[data-start]').click(buttonHandler);

    $("#centro").append(
    "<div id='wizard'>"+
    <!-- steps will go here -->
    "<div title='Select Premier League winner'>"+
    "<label><input type='radio' name='team' value='Arsenal FC' checked='true'>Arsenal FC<br></label>" +
    "<label><input type='radio' name='team' value='Leicester City'>Leicester City<br></label>" +
    "<label><input type='radio' name='team' value='Totenham Spurs'>Totenham Spurs<br></label>" +
    "</div>" +
    "<div title='Select Bundesliga winner'>" +
    "<label><input type='radio' name='squad' value='Borussia' checked='true'>Borussia Dortmünd<br></label>" +
    "<label><input type='radio' name='squad' value='Bayern'>Bayern München<br></label>" +
    "<label><input type='radio' name='squad' value='Leverkusen'>Bayer Leverkusen<br></label>" +
    "</div>" +
    "<div title='Select La Liga winner'>" +
    "<label><input type='radio' name='equipo' value='Real Madrid CF' checked='true'>Real Madrid CF<br></label>" +
    "<label><input type='radio' name='equipo' value='Club At. de Madrid'>Club At. de Madrid<br></label>" +
    "<label><input type='radio' name='equipo' value='FC Barcelona'>FC Barcelona<br></label>" +
    "</div>" +
    "<div title='Select Champions League winner'>" +
    "<label><input type='radio' name='champ' value='Real Madrid CF' checked='true'>Real Madrid CF<br></label>" +
    "<label><input type='radio' name='champ' value='Club At. de Madrid'>Club At. de Madrid<br></label>" +
    "</div>" +
    "<div title='FIFA World Player Candidates'>" +
    "<label><input type='checkbox' name='extra' value='Cristiano Ronaldo' checked='true'>Cristiano Ronaldo<br></label>" +
    "<label><input type='checkbox' name='extra' value='Leo Messi' checked='true'>Leo Messi<br></label>" +
    "<label><input type='checkbox' name='extra' value='Neymar Jr.' checked='true'>Neymar Jr.<br></label>" +
    "<label><input type='checkbox' name='extra' value='Luis Suarez' checked='true'>Luis Suarez<br></label>" +
    "<label><input type='checkbox' name='extra' value='Christian Bale' checked='true'>Christian Bale<br></label>" +
    "</div>" +
    "</div>" +
    "<div data-jqui-cancel title='Cancel'></div>" +
    "<div data-jqui-finish title='Finish'></div>"
    )
});

var buttonHandler = function(){
    $(".back").hide();
    $("#wizard").show();
};
$(function(){
    $("#wizard").jWizard({
        cancel: function(event, data) {
            $window.location.replace("/users");
        },
        finish: function(event, data) {
            $("div[data-jqui-finish]").dialog("open");
        }
    });
    $("div[data-jqui-cancel]").dialog({
        modal: true,
        resizable: false,
        autoOpen: false,
        dragStart: function(event, ui) {
            $(this).html('<p>Please just click the X</p>');
        },
        dragStop: function(event, ui) {
            $(this).html('Thanks for stopping, click the X');
        },
        open: function(event, ui) {
            $(this).html('Cancel');
        }
    });
    $("div[data-jqui-finish]").dialog({
        modal: true,
        resizable: false,
        autoOpen: false,
        dragStart: function(event, ui) {
            $(this).html('<p>Please just click the X</p>');
        },
        dragStop: function(event, ui) {
            $(this).html('Thanks for stopping, click the X');
        },
        open: function printFinal(event, ui) {
            var team = $('input[name=team]').val();
            var equipo = $('input[name=equipo]').val();
            var squad = $('input[name=squad]').val();
            var champ = $('input[name=champ]').val();
            var extras = $('input[name=extra]:checked').map(
                function(){return this.value;}).get().join("<br>- ");
            //var extra2 = $('input[name=extra]:checked').val();
            var extra2 = []
            $('input[name=extra]:checked').each(function() {
                console.log(this.value);
                extra2.push(this.value);
            });
            console.log(extra2);

            $(this).html('<p><b>Summary: </b><br>- ' + team + '<br>- ' + squad + '<br>- '
                + equipo + '<br>- ' + champ + '<br>- '
                + extras
                + '</p>');
            /*
            var extra2 = [];
            $('input[name=extra]:checked').each(function() {
                extra2.push(this.val());
            });
            */
            /*
            $.ajax({
                url: '/users',
                type: 'POST',
                data: {
                    team: team,
                    equipo: equipo,
                    squad: squad,
                    champ: champ,
                    extra: extra2
                },
                success: function(data){
                    console.log(data);
                }
            });
            */
            /*
            $.ajax({
                url: '/users',
                type: 'POST',
                data: {
                    team: team,
                    equipo: equipo,
                    squad: squad,
                    champ: champ,
                    extra: extra2
                },
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
            */
            $.post('/users', {
                team: team,
                equipo: equipo,
                squad: squad,
                champ: champ,
            });

        }
    });
});

