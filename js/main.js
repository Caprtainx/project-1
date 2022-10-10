/*----- state variables -----*/
let board = [];
let rows = 10;
let columns = 10;

let amountOfMines = 8;
let locationOfMines = [];

let tilesClicked = 0;
let flagEnabled = false;

let gameOver = false;
/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/
init();

function init() {
    gameStart();
}

function gameStart() {
    document.getElementById('mines-count').innerText = amountOfMines;

    // generate the board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let square = document.createElement('div')
            square.id = r.toString() + '-' + c.toString();
            document. getElementById('board').append(square);
            row.push(square);
        }
        board.push(row);
    }
    console.log(board);
}