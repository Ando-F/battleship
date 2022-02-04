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

//change cell's color on mouse hover
const changeColorOnHover = (element, listener, color) => {
	element.addEventListener(listener, () => {
		element.style.background = color;
	});
};

const gameBoardCells = document.querySelectorAll('.my-board');
const colorChanger = () => {
	gameBoardCells.forEach((cell) => {
		// getCoordinates(cell);
		changeColorOnHover(cell, 'mouseover', 'yellow');
		changeColorOnHover(cell, 'mouseout', 'white');
	})
}

const changeAxis = () => {
	let clickCount = 1;

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

// const getCoordinates = (element) => {
// 	element.addEventListener('click', (e) => {
// 		console.log(e.target.id);
// 	})
// };

export {
	displayBoard,
	changeColorOnHover,
	changeAxis,
	colorChanger,
}