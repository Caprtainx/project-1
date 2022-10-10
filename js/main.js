/*----- state variables -----*/
let board = [];
let rows = 10;
let columns = 10;

let amountOfMines = 20;
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

function setMines() {
    locationOfMines.push('2-2');
    locationOfMines.push('2-3');
    locationOfMines.push('5-5');
    locationOfMines.push('1-7');
    locationOfMines.push('6-4');
}

function gameStart() {
    setMines();
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
    if (gameOver || this.classList.contains('sqaure-clicked')) {
        return;
    }
    
    // this allows us to place and remove flags as needed
    let square = this;
    if (flagEnabled) {
        if (square.innerText == '') {
            square.innerText = '🚩';
        } else if (square.innerText == '🚩') {
            square.innerText = '';
        }
        return;
    }

    if (locationOfMines.includes(square.id)) {
        // alert('GAME OVER');
        gameOver = true;
        revealMines();
        return;
    }

    let coords = square.id.split('-'); // seperates the string into an array of the string
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let square = board[r][c];
            if (locationOfMines.includes(square.id)) {
                square.innerText = '🎃';
                square.style.backgroundColor = 'red';
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains('square-clicked')){
        return;
    }

    board[r][c].classList.add('square-clicked');
    squaresClicked += 1;

    let minesFound = 0;

    // checking if there are mines in the row above the click
    minesFound += checkSquare(r - 1, c - 1);
    minesFound += checkSquare(r - 1, c);
    minesFound += checkSquare(r - 1, c + 1);

    // checking left and right row of the click
    minesFound += checkSquare(r, c - 1);
    minesFound += checkSquare(r, c + 1);

    //checking if there are mines in the row below the click
    minesFound += checkSquare(r + 1, c -1);
    minesFound += checkSquare(r + 1, c);
    minesFound += checkSquare(r + 1, c + 1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add('number' + minesFound.toString()); 
    } else {
        checkMine(r - 1, c - 1);
        checkMine(r - 1, c);
        checkMine(r - 1, c + 1);
        
        checkMine(r, c - 1);
        checkMine(r, c + 1);
        
        checkMine(r + 1, c - 1);
        checkMine(r + 1, c);
        checkMine(r + 1, c + 1);

    }

    if (squaresClicked == rows * columns - amountOfMines) {
        document.getElementById('mines-count').innerText = 'Cleared';
        gameOver = true; 
    }
}

function checkSquare(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (locationOfMines.includes(r.toString() + '-' + c.toString())) {
        return 1;
    }
    return 0;
}