import {Gameboard} from "./factories";
import {changeAxis, displayBoard, colorChanger} from "./dom";
import {clearBox} from "./help-functions";
import './style.css';

//display player's board
const gameBoardContainer = document.getElementById("game-board");
const firstGameBoard = Gameboard();
displayBoard(firstGameBoard.board, gameBoardContainer, 'my-board');

//display enemy's board
const enemygameBoardContainer = document.getElementById("enemy-game-board");
const enemyBoard = Gameboard();
displayBoard(enemyBoard.board, enemygameBoardContainer, 'enemy-board');

colorChanger();

//now we can change axis value by clicking
changeAxis();

const updateMyBoard = () => {
	clearBox(gameBoardContainer);
	displayBoard(firstGameBoard.board, gameBoardContainer, 'my-board');
	colorChanger();
}

const updateEnemyBoard = () => {
	clearBox(enemygameBoardContainer);
	displayBoard(enemyBoard.board, enemygameBoardContainer, 'enemy-board');
}

//placing ships on my board
const axisValue = document.getElementById('axis-value').innerHTML;
firstGameBoard.placeShip(4, {value: axisValue}, {x: 1, y: 1});
updateMyBoard();