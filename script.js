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
var game_size= 3;
function gameBoard (){
    for( i = 0; i<game_size; i++ ) {
        var row;
        if (i === 0) {
            row = $("<div>").addClass("row" + i).addClass('top');
        }
        else if (i === game_size -1){
            row = $("<div>").addClass("row" + i).addClass('bottom');
        }
        else {
            row = $("<div>").addClass("row" + i);
        }
            $("#game_board").append(row);
            for (j = 0; j < game_size; j++) {
                var cell = $("<div>").addClass("cell");

                $(".row" + i).append(cell);
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
        console.log("Works")
        $(this).html(turn)
        if (turn === "X"){
            turn = "O";
        }else {
            turn = "X"
        };
    });
})

