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

const changeAxis = () => {
	let clickCount = 0;

	const axisContainer = document.getElementById('axis');
	const axisValue = document.getElementById('axis-value');
	axisContainer.addEventListener('click', () => {
		if (clickCount % 2 === 0) {
			axisValue.innerHTML = 'x';
		} else if (clickCount % 2 !== 0) {
			axisValue.innerHTML = 'y';
		}
		clickCount += 1;
	});
};

export {
	displayBoard,
	changeColorOnHover,
	changeAxis
}