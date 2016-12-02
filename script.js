var turn = "X";
var score = {
    "X" : 0,
    "O" : 0
};
var game_size = 2;
var move_counter = 0;
var winning_array = [];
var cells_array = [1];
var win_tracker_p1 = 0;
var win_tracker_p2 = 0;
var num_players;
var game_play;
var launch_codes_array = ["A", "Q", "Z" ,"1", "5", "Z","6", "W", "M", "4"];
var time = 40;
var bgmusic = new Audio("sounds/wargames-theme.mp3");
var sound_fine = new Audio("sounds/fine.mp3");
var sound_excellent = new Audio("sounds/excellent.mp3");
var sound_already = new Audio("sounds/alreadychanged.mp3");
var sound_war = new Audio("sounds/globalthermowar.mp3");
var sound_playgame = new Audio("sounds/playagame.mp3");
var bgimg = "images/wargames-bg1.jpg";


function fadeSong(duration) {
    if (!duration) {
        duration = 2000;
    }
    $(bgmusic).animate({volume: 0},duration);
    $(bgmusic).trigger('pause');
    $(bgmusic).prop("currentTime",0);
}

function changeBackground(new_bg) {
    bg=$("#bgimg");
    bg.fadeOut();
    setTimeout(function(){
        new_bg = 'images/' + new_bg;
        bg.html('<img src = "'+new_bg+'" id="bg">');
        bg.fadeIn()
    }, 500);
}

function statsDisplay() {
    var stats_container = $("<div>").addClass('statscontainer');
    $('body').append(stats_container);
    var stats_head = $("<h1> Stats</h1>").addClass("statsheader");
    var player_container=$("<div>").addClass("playercontainer");
    var player1= $(player_container).append('<div id="player1">Player 1</div><p class="value1"></p>');
    var player2= $(player_container).append('<div id="player2">Player 2</div><p class="value2"></p>');
    // var stats_target = $(".stats_container");
    stats_container.append(stats_head,player_container,player1,player2);
}

/* set game to initial conditions*/
var initGame = function () {
    game_play = true;
    turn = "X";
    move_counter = 0;
    winning_array = [];
    cells_array = [1];
    score = {
        "X" : 0,
        "O" : 0
    };
    startPage0();
};

function startPage0() {
    $('#game_screen').hide();
    bgmusic = new Audio("sounds/introsong.mp3");
    bgmusic.play();
    var start_page0 = $('<div>').addClass('startpage0');
    $('body').append(start_page0);
    var intro_warning = $('<h1 style="color: white">Please make sure your volume is up and your browser is full screen before continuing.<p>Tip- F11 in Chrome</p><p>If you have a leap motion controller <span id="warning_click">CLICK HERE.</span></p><p>If not, <span id="warning_click2">CLICK HERE.</span></p></h1>');
    $('.startpage0').append(intro_warning);
    $('#warning_click').click(function(){
        initialize("",0,0,1);
        startPage0_1();
    });
    $('#warning_click2').click(startPage0_2);
}

function startPage0_1() {
    $('.startpage0 *').remove();
    var start_page0_img = $('<img src="images/newstartbg2.png">');
    $('.startpage0').append(start_page0_img);
    var sound_tammy = new Audio("sounds/tammy1.mp3");
    sound_tammy.play();
}

function startPage0_2() {
    $('.startpage0 *').remove();
    start_page0_img = $('<img id="hypno" src="images/hypnocircle.gif">');
    $('.startpage0').append(start_page0_img);
    var sound_tammy2 = new Audio("sounds/tammy2.mp3");
    sound_tammy2.play();
    setTimeout(function(){
        $('#hypno').fadeOut();
        setTimeout(function() {
            $('.startpage0').remove();
            startPage();
        },500)
    },5000);
}

function startPage() {
    fadeSong(2000);
    bgmusic=new Audio("sounds/wargames-theme.mp3");
    bgmusic.play();
    sound_playgame.play();
    var start_page = $('<div>').addClass('startpage');
    $('body').append(start_page);
    var start_prompt1 = $('<p>wargames ~$ <input type="text" id="players_input"></p>');
    var start_tip = $('<p>Click the image or type tic-tac-toe to play the game!</p>');
    var start_button = $('<img src="images/wargames-fullboard.jpg" id="start_pic">');
    var start_target = $('.startpage');
    $('#game_screen').hide();
    start_target.append(start_prompt1,start_tip,start_button);              //builds the start page
    $('#players_input').focus();
    $('#start_pic').click(startPage2);
    $('#players_input').keypress(function (event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if ($('#players_input').val().toLowerCase() == "tic-tac-toe") {
                startPage2();
            }
        }
    })
}

function startPage2() {
    sound_fine.play();
    var start_target = $('.startpage');
    $('#start_pic').hide();
    var start_prompt2 = $('<p>wargames ~$</p><p>Tic-Tac-Toe</p><p>Number of players? <input id="players_input_num_players"></p>');
    start_target.append(start_prompt2);
    $('#players_input_num_players').focus();
    $('#players_input_num_players').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            num_players = $('#players_input_num_players').val();
            if (num_players.toLowerCase() == 'two') {
                num_players = '2';
            }
            if (num_players == '2') {
                startPage3();
            } else if (num_players == '0' || num_players.toLowerCase() =='zero') {
                easterEgg();
            // } else if(num_players =="1" || num_players.toLowerCase() =="one"){
            //    callAI();
            } else {
                var warning=$('<p>Tic-Tac-Toe can only be played with two players. Please try again.</p>');
                start_target.append(warning);
            }
        }
    })
}

function startPage3() {
    sound_excellent.play();
    var start_target = $('.startpage');
    var start_prompt3 = $('<p>wargames ~$</p><p>Size of board(3-5)? <input id="players_input_gamesize"></p>');
    start_target.append(start_prompt3);
    $('#players_input_gamesize').focus();
    $('#players_input_gamesize').keypress(function (event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            game_size = $('#players_input_gamesize').val();
            if (game_size.toLowerCase() == "three") {
                game_size = '3';
            } else if (game_size.toLowerCase() == "four") {
                game_size = '4';
            } else if (game_size.toLowerCase() == "five") {
                game_size = '5';
            }
            if (game_size >= 3 && game_size <= 5) {
                winning_array = generateWinningNumbers(game_size);
                start_target.remove();
                $('#game_screen').show();
                gameBoard(game_size);
                statsDisplay();
                updateStats();
                $('#player1').css({"color":"white","background-color":"green"});
                $('#player2').css({"color":"lightblue","background-color":"inherit"});
            } else {
                var game_size_warning = $('<p>Please enter a value between 3 and 5.</p>');
                sound_already.play();
                start_target.append(game_size_warning);
            }
        }
    })
}

function easterEgg() {
    var egg_sound=['strange.mp3','hallucination.mp3','maybedefcon1.mp3','secure.mp3','war.mp3'];
    var sound_number = (Math.floor(Math.random()*5) + 1);
    var egg = $('<img id = "egg" src = "images/wargames-tictactoe.gif">');
    debugger;
    $('.startpage').append(egg);
    setTimeout(function(){
        $('.startpage').children('img').remove();
        }, 5500);
    var sound_egg = new Audio('sounds/'+egg_sound[sound_number]);
    sound_egg.play();
}

function gameBoard(game_size) {
    var row = "";
    var cell = "";
    var cell_array_counter = 0;
    for(var x=1; x < game_size * game_size; x++){
        cells_array.push(Math.pow(2, x));
    }
    $('#bgimg').html('<img src="images/wargames-bg1.jpg" id="bg">');
    var header=$('<header><img src="images/wopr.jpg"></header>');
    $("#game_screen").append(header);
    for (var i = 0; i < game_size; i++) {
        if (i === 0) {
            row = $("<div>").addClass("row").addClass('top');
        }
        else if (i === game_size - 1) {
            row = $("<div>").addClass("row").addClass('bottom');
        }
        else {
            row = $("<div>").addClass("row").addClass('middle');
        }
        // $("#game_board").append(row);
        for (j = 0; j < game_size; j++) {
            if (j === 0) {
                cell = $("<div>").addClass("cell").addClass("left_side").data("cell_value",cells_array[cell_array_counter++]);
            }
            else if (j === game_size - 1) {
                cell = $("<div>").addClass("cell").addClass('right_side').data("cell_value",cells_array[cell_array_counter++]);
            }
            else {
                cell = $("<div>").addClass("cell").data("cell_value", cells_array[cell_array_counter++]);
            }
            row.append(cell);
        }
        $("#game_board").append(row);
    }
    var reset_button=$('<img src="images/nukebutton.png" id="reset_button">');
    $("#game_screen").append(reset_button);
    $("#reset_button").click(resetAll);
    $(".cell").click(cellClicked);
    fadeSong(10);
    bgmusic=new Audio('sounds/track-2.mp3');
    bgmusic.play();
    sound_war.play();
    $(".count_down_timer *").show();
    startCountDown();
}

var callAI = function(){
    startPage3();
    initGame();
    if (turn = "O") {
        var AI_move = cells_array[Math.floor(Math.random()*(game_size*game_size))];
        if (AI_move.hasClass("unclickable")){
            AI_move;
        }
        AI_move.text(turn);
        score[turn] += $(this).data("cell_value");
        winConditionChecker();
        $(this).unbind("click");
        $(this).addClass("unclickable");
    }
    switchPlayers();
};

/*Generate array of winning numbers*/
var generateWinningNumbers = function(game_size) {
    var val = 1, cells = [], wins = [];
    for (var i = 0; i < game_size; i++) {
        cells[i] = [];
        for (var j = 0; j < game_size; j++){
            cells[i][j] = val;
            val *= 2;
        }
    }
    var row_wins = [], col_wins = [], first_diag_win = 0, second_diag_win=0;
    for (i = 0; i < game_size; i++){
        row_wins[i] = 0;
        col_wins[i] = 0;
        first_diag_win += cells[i][i];
        second_diag_win += cells[i][game_size - i - 1];
        for (j=0; j< game_size; j++){
            row_wins[i] += cells[i][j];
            col_wins[i] += cells[j][i];
        }
    }
    return row_wins.concat(col_wins, first_diag_win, second_diag_win);
};

/*Check player score against winning numbers and returns result*/
var winningScore = function(player_score){
    for (var i = 0; i < winning_array.length; i++){
        if ((winning_array[i] & player_score) === winning_array[i]){
            return true
        }
    }
    return false
};

var cellClicked = function() {
    $(this).text(turn);
    move_counter++;
    if (move_counter == 5) {
        changeBackground('wargames-bg2.jpg');
        fadeSong(2000);
        setTimeout(function(){
            bgmusic=new Audio('sounds/track-9.mp3');
            bgmusic.play();
            }, 6500);
        var playitself = new Audio('sounds/learn.mp3');
        playitself.play();
    } else if (move_counter == 8) {
        var learn = new Audio('sounds/learndammit.mp3');
        learn.play();
    } else if (move_counter == 12) {
        var caught = new Audio('sounds/caughtinaloop.mp3');
        changeBackground('wargames-bg3.jpg');
        caught.play();
    }
    score[turn] += $(this).data("cell_value");
    winConditionChecker();
    switchPlayers();
    $(this).unbind("click");
    $(this).addClass("unclickable");
};

/*Switch players*/
var switchPlayers = function() {
    if (turn === "X"){
        turn = "O";
        //player2
        $('#player2').css({"color":"white","background-color":"green"});
        $('#player1').css({"color":"lightblue","background-color":"inherit"});
    }else{
        turn = "X";
        //player1
        $('#player1').css({"color":"white","background-color":"green"});
        $('#player2').css({"color":"lightblue","background-color":"inherit"});
    }
};

/*Checks winning condition*/
var winConditionChecker = function() {
    if (winningScore(score[turn])){
        if (turn==="X") {
            win_tracker_p1++;
            updateStats();
            gameWon();
            game_play= false;
        } else if (turn==="O") {
            win_tracker_p2++;
            game_play = false;
            updateStats();
            gameWon();
        }
        updateStats();
        // initGame();
    }  else if (move_counter === (game_size * game_size)){
        game_play = false;
        gameTie();
        // initGame();
    }
};

function gameTie() {
    $('#game_board *').remove();
    $('#reset_button').toggle();
    $('header img').remove();
    $(".count_down_timer *").hide();
    fadeSong(1000);
    bgmusic=new Audio('sounds/track-8.mp3');
    bgmusic.play();
    var winning_gif=$('<img id="winner" src="images/launchcode.gif">');
    $('#game_screen').append(winning_gif);
    var tie_sound=new Audio('sounds/systemsucks.mp3');
    var tie_sound2=new Audio('sounds/microchips.mp3');
    tie_sound.play();
    setTimeout(function(){
        tie_sound2.play();
        setTimeout(function(){
            winning_gif.remove();
            $('#reset_button').toggle();
            // resetAll();
        }, 8000);
    }, 6000);
}

function gameWon() {
    time = time/2;
    $('#game_board *').remove();
    $('#reset_button').toggle();
    $('header img').remove();
    fadeSong(1000);
    bgmusic=new Audio('sounds/track-5.mp3');
    bgmusic.play();
    $('.count_down_timer').css("background-color","transparent");
    var winning_gif=$('<img id="winner" src="images/nukeslaunching.gif">');
    $('#game_screen').append(winning_gif);
    var winning_sound=new Audio('sounds/2400warheads.mp3');
    var winning_sound2=new Audio('sounds/billiantlight.mp3');
    winning_sound.play();
    setTimeout(function(){
        winning_sound2.play();
        setTimeout(function(){
        winning_gif.remove();
        $(".count_down_timer *").hide();
        $('.count_down_timer').css("background-color","black");
        $('#reset_button').toggle();
        }, 6000);
    }, 6000);

}
function updateStats(){
       $(".value1").text(win_tracker_p1);
       $(".value2").text(win_tracker_p2);
}

function resetAll() {
    $('#game_board *').remove();
    $('#bgimg img').remove();
    $('.statscontainer').remove();
    $('#reset_button').remove();
    $('header img').remove();
    $(".count_down_timer *").hide();
    initGame();
}

function resetBoard() {
    gameBoard();
}

function randomizeCodes(){
    return launch_codes_array[(Math.floor(Math.random()*7))];
}

function startCountDown() {
    var a = randomizeCodes();
    var b = randomizeCodes();
    var c = randomizeCodes();
    var d = randomizeCodes();
    var e = randomizeCodes();
    var f = randomizeCodes();
    var g = randomizeCodes();
    if (game_play === true) {
        $("#launch_title").text("Launch Codes:");
        if (!$("#char_1").hasClass('dontanimate')) {
            $("#char_1").text(a);
        } else{
            $("#char_1").text("A");
        }
        if (!$("#char_2").hasClass('dontanimate')) {
            $("#char_2").text(b);
        } else {
            $("#char_2").text('Q');
        }
        if (!$("#char_3").hasClass('dontanimate')) {
            $("#char_3").text(c);
        } else{
            $("#char_3").text('Z');
        }
        if (!$("#char_4").hasClass('dontanimate')) {
            $("#char_4").text(d);
        } else{
            $("#char_4").text('1');
        }if (!$("#char_5").hasClass('dontanimate')) {
            $("#char_5").text(e);
        } else {
            $("#char_5").text('5');
        }
        if (!$("#char_6").hasClass('dontanimate')) {
            $("#char_6").text(f);
        } else{
            $("#char_6").text('Z');
        }
        if (!$("#char_7").hasClass('dontanimate')) {
            $("#char_7").text(g);
        } else {
            $("#char_7").text('M');
        }
    }
    var t = setTimeout(startCountDown, time);
    SetLaunchCode();
}

function SetLaunchCode() {
    console.log("remove class function");
    setTimeout(function () {
        $("#char_1").addClass('dontanimate');
    }, 10000);
    setTimeout(function () {
        $("#char_2").addClass('dontanimate');
    }, 20000);
    setTimeout(function () {
        $("#char_3").addClass('dontanimate');
    }, 30000);
    setTimeout(function () {
        $("#char_4").addClass('dontanimate');
    }, 40000);
    setTimeout(function () {
        $("#char_5").addClass('dontanimate');
    }, 50000);
    setTimeout(function () {
        $("#char_6").addClass('dontanimate');
    }, 60000);
    setTimeout(function () {
        $("#char_7").addClass('dontanimate');
    }, 14000000000);
}
$(document).ready(function() {
    // startPage();
    initGame();
});

