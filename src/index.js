import {Gameboard} from "./factories";
import {changeAxis, displayBoard, locateShip, gameBoardContainer, enemyGameBoardContainer} from "./dom";
import {clearBox} from "./help-functions";
import './style.css';

//creating boards
const firstGameBoard = Gameboard();
const enemyBoard = Gameboard();

//display both boards
displayBoard(firstGameBoard.board, gameBoardContainer, 'my-board');
displayBoard(enemyBoard.board, enemyGameBoardContainer, 'enemy-board');

//adding color animation
const gameBoardCells = document.querySelectorAll('.my-board');
for (let i = 0; i !== 2; i++) {
	locateShip(gameBoardCells, 4);
}

//now we can change axis value by clicking
changeAxis();

const updateBoard = (container, board, elementClass) => {
	clearBox(container);
	displayBoard(board, container, elementClass);
}

export {
	updateBoard,

	firstGameBoard
}