//getting board containers from the DOM
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

const colorCells = (cell) => {
	if (cell.innerHTML === '1') {
		cell.style.background = 'lightblue';
	}
}

export {
	displayBoard,

	gameBoardContainer,
	enemyGameBoardContainer
}