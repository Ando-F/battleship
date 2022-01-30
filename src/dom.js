const displayBoard = (board) => {
	const gameBoardContainer = document.getElementById("game-board");

	for (let i = 0; i < board.length; i++) {
		const oneCell = document.createElement('div');
		oneCell.classList.add('cell');
		oneCell.id = i;
		gameBoardContainer.appendChild(oneCell);
	}
};

export {
	displayBoard
}