$(function(){
    $("#MenuDesplegable").html(
        "<li><a href='/'>Home</a></li>"+
        "<li><a href='/users'>Votings</a></li>"+
        "<li><a href='/login/logout'>Logout</a> </li>"+
        //"<li><a class='MenuBarItemSubmenu' href='/login'>Sign in</a>"+
        //    "<ul>"+
        //        "<li><a href='/login/register'>Sign up</a></li>"+
        //    "</ul>"+
        //"</li>"+
        "<li><a href='/'>Contact</a></li>"
    )
    var MenuBar1 = new Spry.Widget.MenuBar(
        "MenuDesplegable",
        {
            imgDown:"SpryAssets/SpryMenuBarDownHover.gif",
            imgRight:"SpryAssets/SpryMenuBarRightHover.gif"
        });
});