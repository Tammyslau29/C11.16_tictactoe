var turn= "X";
var score;
var game_size=2;
var move_counter = 0;
var winning_array=[];
var cells_array=[1];
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


function statsDisplay() {
    var stats_container = $("<div>").addClass('statscontainer');
    $('body').append(stats_container);
    var stats_head = $("<h1> Stats</h1>").addClass("statsheader");
    var player_container=$("<div>").addClass("playercontainer");
    var players= $(player_container).append('<h2>Player 1</h2>','<h2>Player 2</h2>');
    var stats_target = $(".stats_container");
    stats_container.append(stats_head,player_container,players);
    //var reset_button=$
}




function startPage2() {
    var start_target = $('.startpage');
    $('#start_pic').hide();
    var start_prompt2 = $('<p>wargames ~$</p><p>Tic-Tac-Toe</p><p>Number of players? <input id="players_input_num_players"></p>');
    start_target.append(start_prompt2);
    $('#players_input_num_players').focus();
    $('#players_input_num_players').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var num_players = $('#players_input_num_players').val();
            console.log("number of players= " + num_players + typeof (num_players));
            if (num_players=='2' || num_players=='two') {
                startPage3();
            } else if (num_players=='0' || num_players=='zero') {
                easterEgg();
            } else {
                var warning=$('<p>Tic-Tac-Toe can only be played with two players. Please try again.</p>');
                start_target.append(warning);
            }
        }
    })
}
function startPage3() {
    var start_target = $('.startpage');
    var start_prompt3=$('<p>wargames ~$</p><p>Size of board(3-6)? <input id="players_input_gamesize"></p>');
    start_target.append(start_prompt3);
    $('#players_input_gamesize').focus();
    $('#players_input_gamesize').keypress(function (event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            game_size = $('#players_input_gamesize').val();
            winning_array = generateWinningNumbers(game_size);
            console.log('game size is '+game_size);
            if (game_size>=3 && game_size<=6) {
                start_target.toggle();
                // $('#players_input_gamesize').unbind(keypress);
                gameBoard(game_size);
                statsDisplay();
            } else {
                var game_size_warning = $('<p>Please enter a value between 3 and 6.</p>');
                start_target.append(game_size_warning);
            }
        }
    })
}
function easterEgg() {
    console.log('Easter egg found');
    var egg=$('<img id="egg" src="images/wargames-tictactoe.gif">');
    $('.startpage').append(egg);
}

// var game_size = $('#players_input_gamesize').val();
function gameBoard(game_size) {
    var row = "";
    var cell="";
    var cell_array_counter=0;
    for(x=1;x<game_size*game_size;x++){
        cells_array.push(Math.pow(2,x));
    }
    console.log(cells_array);
    for (i = 0; i < game_size; i++) {
        if (i === 0) {
            row = $("<div>").addClass("row").addClass('top');
        }
        else if (i === game_size - 1) {
            row = $("<div>").addClass("row").addClass('bottom');
        }
        else {
            row = $("<div>").addClass("row").addClass('middle');
        }
        $("#game_board").append(row);
        for (j = 0; j < game_size; j++) {
            if (j === 0) {
                cell = $("<div>").addClass("cell").addClass("left_side").data("cell_value",cells_array[cell_array_counter++]);
                console.log(cell.data("cell_value"));
            }
            else if (j === game_size - 1) {
                cell = $("<div>").addClass("cell").addClass('right_side').data("cell_value",cells_array[cell_array_counter++]);
                console.log(cell.data("cell_value"));
            }

            else {
                cell = $("<div>").addClass("cell").data("cell_value", cells_array[cell_array_counter++]);
                console.log(cell.data("cell_value"));
            }
            row.append(cell);
        }
    }
    $(".cell").click(cellClicked);
}
/* sets game to initial conditions*/
var initGame = function (){
    turn= "X";
    score = {
        "X" : 0,
        "O" : 0
    };
    move_counter = 0;
};
/*Generates array of winning numbers*/
var generateWinningNumbers = function(game_size){
    var val = 1, cells = [], wins = [];
    for (var i = 0; i < game_size; i++) {
        cells[i] = [];
        for (var j = 0; j < game_size; j++){
            cells[i][j] = val;
            val *=2;
        }
    }
    var row_wins = [], col_wins = [], first_diag_win = 0, second_diag_win=0;
    for (i = 0; i < game_size; i++){
        row_wins[i]=0;
        col_wins[i]=0;
        first_diag_win += cells[i][i];
        second_diag_win += cells[i][game_size - i - 1];
        for (j=0; j< game_size; j++){
            row_wins[i] += cells[i][j];
            col_wins[i] += cells[j][i];
        }
    }
    return row_wins.concat(col_wins, first_diag_win, second_diag_win);
};
/*Checks player score against winning numbers and returns result*/
var winningScore = function(player_score){
    for (var i = 0; i < winning_array.length; i++){
        if ((winning_array[i] & player_score) === winning_array[i]){
            return true
        }
    }
    return false
};
var cellClicked = function(){
    $(this).text(turn);
    move_counter++;
    score[turn] += $(this).data("cell_value");
    conditionChecker();
    switchPlayers();
    $(this).unbind("click");
    $(this).addClass("unclickable");
};
/*Switches players*/
var switchPlayers = function(){
    if (turn === "X"){
        turn = "O";
    }else {
        turn = "X"
    }
};
/*Checks winning condition*/
var conditionChecker = function(){
    console.log(score[turn]);
    if (winningScore(score[turn])){
        alert("You Win");
        initGame();
    }else if (move_counter === (game_size * game_size)){
        alert("Cat's Game");
        initGame();
    }
};
$(document).ready(function() {
    startPage();
    initGame();

});

