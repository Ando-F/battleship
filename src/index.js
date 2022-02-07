import {Gameboard} from "./Gameboard";
import {Player} from "./Player";
import {
	displayBoard,

	gameBoardContainer,
	enemyGameBoardContainer,
} from "./dom";
import './style.css';
import {
	updateBoard
} from "./help-functions";

//creating boards
const firstGameBoard = Gameboard();
const enemyBoard = Gameboard();

//display both boards
displayBoard(firstGameBoard.board, gameBoardContainer, 'my-board');
displayBoard(enemyBoard.board, enemyGameBoardContainer, 'enemy-board');

//place ships on board
firstGameBoard.placeShip(4, {value: 'x'}, {x: 1, y: 2});

firstGameBoard.placeShip(3, {value: 'y'}, {x: 1, y: 4});
firstGameBoard.placeShip(3, {value: 'y'}, {x: 7, y: 0});

firstGameBoard.placeShip(2, {value: 'x'}, {x: 6, y: 4});
firstGameBoard.placeShip(2, {value: 'y'}, {x: 9, y: 5});
firstGameBoard.placeShip(2, {value: 'y'}, {x: 5, y: 7});

firstGameBoard.placeShip(1, {value: 'y'}, {x: 0, y: 0});
firstGameBoard.placeShip(1, {value: 'y'}, {x: 9, y: 9});
firstGameBoard.placeShip(1, {value: 'y'}, {x: 0, y: 9});
firstGameBoard.placeShip(1, {value: 'y'}, {x: 9, y: 0});

updateBoard(gameBoardContainer, firstGameBoard.board, 'my-board');

//place enemy ships on enemy board
const enemy = Player();
const axis = enemy.randomAxis();
enemyBoard.placeShip(4, {value: axis}, enemy.randomCoordinates(4, axis));
console.log(enemy.xArray, enemy.yArray);
const axis1 = enemy.randomAxis();
enemyBoard.placeShip(3, {value: axis1}, enemy.randomCoordinates(4, axis1));
updateBoard(enemyGameBoardContainer, enemyBoard.board, 'enemy-board');