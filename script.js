/**
 * Created by sloan on 11/29/2016.
 */

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
            row_wins[i] += cells[i][j]
            col_wins[i] += cells[j][i]
        }
    }
    return row_wins.concat(col_wins, first_diag_win, second_diag_win);
};
var winning_array = generateWinningNumbers(game_size)

console.log(winning_array)
//Checks player score against winning numbers and returns result//
var winningScore = function(score){
    for (var i = 0; i < winning_array.length; i++){
        if (winning_array[i] & player_score === winning_array[i]){
            return true
        }
        return false
    }
}