const displayBoard = (board, container, uniqueClass) => {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			const oneCell = document.createElement('div');
			oneCell.classList.add('cell');
			oneCell.classList.add(uniqueClass);
			oneCell.innerHTML = board[i][j];
			oneCell.id = (i * 10) + j;
			container.appendChild(oneCell);
		}
	}
};

const changeColorOnHover = (element, listener, color) => {
	element.addEventListener(listener, () => {
		element.style.background = color;
	});
};

export {
	displayBoard,
	changeColorOnHover
}