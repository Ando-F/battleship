//getting board containers from the DOM
import {updateBoard, clearCells} from "./help-functions";

import {enemyBoard, firstGameBoard} from "./index";
import {randomCoordinates} from "./AI";

const gameBoardContainer = document.getElementById("game-board");
const enemyGameBoardContainer = document.getElementById("enemy-game-board");

const displayBoard = (board, container, uniqueClass) => {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			const oneCell = document.createElement('div');
			oneCell.classList.add('cell');
			oneCell.classList.add(uniqueClass);
			oneCell.innerHTML = board[i][j];
			oneCell.id = (i * 10) + j;
			container.appendChild(oneCell);

			colorCells(oneCell);
		}
	}
};

// adding event listeners to all cells using Event Delegation
enemyGameBoardContainer.addEventListener('click', (e) => {
	if (e.target && e.target.nodeName === 'DIV') {
		let x = Math.floor(e.target.id / 10);
		let y = e.target.id % 10;

		enemyBoard.recieveAttack({x: x, y: y});
		updateBoard(enemyGameBoardContainer, enemyBoard.board, 'enemy-board');
	}
})

const colorCells = (cell) => {
	if (cell.innerHTML === '1') {
		cell.style.background = 'lightblue';
	} else if (cell.innerHTML === '2') {
		cell.style.background = 'red';
	}
}

export {
	displayBoard,

	gameBoardContainer,
	enemyGameBoardContainer
}