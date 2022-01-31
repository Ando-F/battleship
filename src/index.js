import {Gameboard} from "./factories";
import {displayBoard} from "./dom";
import './style.css';

const gameBoardContainer = document.getElementById("game-board");
const firstGameBoard = Gameboard();
displayBoard(firstGameBoard.board, gameBoardContainer);

const enemygameBoardContainer = document.getElementById("enemy-game-board");
const enemyBoard = Gameboard();
displayBoard(enemyBoard.board, enemygameBoardContainer);