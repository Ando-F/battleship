import {Gameboard} from "./factories";
import {
	displayBoard,

	gameBoardContainer,
	enemyGameBoardContainer,
} from "./dom";
import './style.css';

//creating boards
const firstGameBoard = Gameboard();
const enemyBoard = Gameboard();

//display both boards
displayBoard(firstGameBoard.board, gameBoardContainer, 'my-board');
displayBoard(enemyBoard.board, enemyGameBoardContainer, 'enemy-board');