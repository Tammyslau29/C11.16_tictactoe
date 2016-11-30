/**
 * Created by sloan on 11/29/2016.
 */

/* function for creating game board */
$(document).ready(gameBoard)


var game_size= 3;
function gameBoard (){
    for( i = 0; i<game_size; i++ ) {
        if (i === 0) {
            var row = $("<div>").addClass("row" + i).addClass('top');
        }
        else if (i === game_size -1){
            var row = $("<div>").addClass("row" + i).addClass('bottom');
        }
        else {
            var row = $("<div>").addClass("row" + i);
        }
            $("#game_board").append(row);
            for (j = 0; j < game_size; j++) {
                var cell = $("<div>").addClass("cell");

                $(".row" + i).append(cell);
            }
        }
}

