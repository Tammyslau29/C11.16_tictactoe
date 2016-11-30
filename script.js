function startPage() {


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
            if ($('#players_input').val() == "tic-tac-toe") {
                // $('#players_input').unbind(keypress);
                startPage2();
            }
        }
    })
}
function startPage2() {
    var start_target=$('.startpage');
    $('#start_pic').hide();
    var start_prompt2=$('<p>wargames ~$</p><p>Tic-Tac-Toe</p><p>Size of board(3-7)? <input id="players_input_gamesize"></p>');
    start_target.append(start_prompt2);
    $('#players_input_gamesize').focus();
    $('#players_input_gamesize').keypress(function (event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            var game_size = $('#players_input_gamesize').val();
            console.log('game size is'+game_size);
            $('.startpage').toggle();
            // $('#players_input_gamesize').unbind(keypress);
            gameBoard(game_size);
        }
    })
}
var game_size = $('#players_input_gamesize').val();
function gameBoard(game_size) {
    console.log("game board called");
    var row = "";
    var cell="";
    for (i = 0; i < game_size; i++) {
        if (i === 0) {
            console.log("first I");
            row = $("<div>").addClass("row").addClass('top');
        }
        else if (i === game_size - 1) {
            row = $("<div>").addClass("row").addClass('bottom');
            console.log("first  i else if");

        }
        else {
            row = $("<div>").addClass("row").addClass('middle');
            console.log("I else");

        }
        $("#game_board").append(row);
        for (j = 0; j < game_size; j++) {
            if (j === 0) {
                cell = $("<div>").addClass("cell").addClass("left_side");
                console.log("first j");
            }
            else if (j === game_size - 1) {
                cell = $("<div>").addClass("cell").addClass('right_side');
                console.log("first  j else if ");
            }
            else{
                cell = $("<div>").addClass("cell");
                console.log("else j ");
            }
            row.append(cell);
        }
    }
}
/*Generates array of winning numbers*/
var generateWinningNumbers = function(size){
    var val = 1, cells = [], wins = [];
    for (var i = 0; i < size; i++) {
        cells[i] = [];
        for (var j = 0; j < size; j++){
            cells[i][j] = val;
            val *=2;
        }
    }
    var row_wins = [], col_wins = [], first_diag_win = 0, second_diag_win=0;
    for (i = 0; i < size; i++){
        row_wins[i]=0;
        col_wins[i]=0;
        first_diag_win += cells[i][i];
        second_diag_win += cells[i][size - i - 1];
        for (j=0; j< size; j++){
            row_wins[i] += cells[i][j];
            col_wins[i] += cells[j][i];
        }
    }
    return row_wins.concat(col_wins, first_diag_win, second_diag_win);
};
var winning_array = generateWinningNumbers(game_size);
/*Checks player score against winning numbers and returns result*/
var winningScore = function(score){
    for (var i = 0; i < winning_array.length; i++){
        if (winning_array[i] & player_score === winning_array[i]){
            return true
        }
        return false
    }
};
$(document).ready(function() {
    startPage();
    var turn = "X";
    $(this).click(function(){
        console.log("Works");
        $(this).html(turn);
        turn = turn === "X" ? "O" : "X";
    })
});


