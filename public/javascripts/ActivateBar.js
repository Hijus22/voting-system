$(function(){
    $("#MenuDesplegable").html(
        "<li><a href='/'>Home</a></li>"+
        "<li><a href='/'>Votings</a></li>"+
        "<li><a class='MenuBarItemSubmenu' href='/'>Sign in</a>"+
            "<ul>"+
                "<li><a href='/'>Sign up</a></li>"+
            "</ul>"+
        "</li>"+
        "<li><a href='/'>Contact</a></li>"
    )
    var MenuBar1 = new Spry.Widget.MenuBar(
        "MenuDesplegable",
        {
            imgDown:"SpryAssets/SpryMenuBarDownHover.gif",
            imgRight:"SpryAssets/SpryMenuBarRightHover.gif"
        });
});