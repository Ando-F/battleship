import {Gameboard} from "./factories";
import {changeAxis, changeColorOnHover, displayBoard} from "./dom";
import './style.css';

//display player's board
const gameBoardContainer = document.getElementById("game-board");
const firstGameBoard = Gameboard();
displayBoard(firstGameBoard.board, gameBoardContainer, 'my-board');

//display enemy's board
const enemygameBoardContainer = document.getElementById("enemy-game-board");
const enemyBoard = Gameboard();
displayBoard(enemyBoard.board, enemygameBoardContainer, 'enemy-board');

//change cell's color on mouse hover
const gameBoardCells = document.querySelectorAll('.my-board');
gameBoardCells.forEach((cell) => {
	changeColorOnHover(cell, 'mouseover', 'yellow');
	changeColorOnHover(cell, 'mouseout', 'white');
})

changeAxis();