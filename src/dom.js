const displayBoard = (board, container) => {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			const oneCell = document.createElement('div');
			oneCell.classList.add('cell');
			oneCell.id = i;
			container.appendChild(oneCell);
		}
	}
};

export {
	displayBoard
}