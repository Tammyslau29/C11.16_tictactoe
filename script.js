$(document).ready(startPage);

function startPage() {
    // assign click handlers here

    var start_page=$('<div>').addClass('startpage');
    $('body').append(start_page);
    var start_prompt1=$('<p>wargames ~$ <input type="text" id="players_input" autofocus></p>');
    var start_tip=$('<p>Click the image or type tic-tac-toe to play the game!</p>');
    var start_button=$('<img src="images/wargames-fullboard.jpg" id="start_pic">');
    var start_target=$('.startpage');
    start_target.append(start_prompt1,start_tip,start_button);              //builds the start page
    $('#start_pic').click(startPage2);
    $('#players_input').keypress(function (event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if ($('#players_input').val() == "tic-tac-toe") {startPage2();}
        }
    })

}

function startPage2() {
    var start_target=$('.startpage');
    $('#start_pic').hide();
    var start_prompt2=$('<p>wargames ~$</p><p>Tic-Tac-Toe</p><p>Number of players? <input id="players_input_number"></p>');
    start_target.append(start_prompt2);
    $('#players_input_number').focus();
}

