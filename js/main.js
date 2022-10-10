/*----- state variables -----*/
let board = [];
let rows = 10;
let columns = 10;

let amountOfMines = 8;
let locationOfMines = [];

let squaresClicked = 0;
let flagEnabled = false;

let gameOver = false;
/*----- cached elements  -----*/
document.getElementById('mines-count').innerText = amountOfMines;

/*----- event listeners -----*/
document.getElementById('flag-button').addEventListener('click', setFlag);
/*----- functions -----*/
init();

function init() {
    gameStart();
}

function gameStart() {
    
    // generate the board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let square = document.createElement('div')
            square.id = r.toString() + '-' + c.toString();
            square.addEventListener('click', clickSquare);
            document. getElementById('board').append(square);
            row.push(square);
        }
        board.push(row);
    }
    // check if the divs of the board were made
    console.log(board);
}
// this allows us to toggle the flag button on and off
function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById('flag-button').style.backgroundColor = 'lightgrey';
    } else {
        flagEnabled = true;
        document.getElementById('flag-button').style.backgroundColor = 'darkgrey';
    }
}

function clickSquare() {
    // this allows us to place and remove flags as needed
    let square = this;
    if (flagEnabled) {
        if (square.innerText == '') {
            square.innerText = '🚩';
        } else if (square.innerText == '🚩') {
            square.innerText = '';
        }
    }
}