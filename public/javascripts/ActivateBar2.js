/**
 * Created by Hijus on 11/5/16.
 */
$(function(){
    $("#MenuDesplegable").html(
        "<li><a href='/'>Home</a></li>"+
        "<li><a href='/'>Votings</a></li>"+
        "<li><a href='/'>Contact</a></li>"
    )
    var MenuBar1 = new Spry.Widget.MenuBar(
        "MenuDesplegable",
        {
            imgDown:"SpryAssets/SpryMenuBarDownHover.gif",
            imgRight:"SpryAssets/SpryMenuBarRightHover.gif"
        });
});