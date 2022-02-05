import {updateBoard, firstGameBoard} from "./index";

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
		}
	}
};

//change cell's color on event
const changeColorOnHover = (element, listener, color) => {
	element.addEventListener(listener, () => {
		element.style.background = color;
	});
};

const locateShip = (elements, length) => {
	elements.forEach((cell) => {
		getCoordinatesAndPlaceShip(cell, length);
		changeColorOnHover(cell, 'mouseover', 'yellow');
		changeColorOnHover(cell, 'mouseout', 'white');
	})
}

//ability to change axis string value by click
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

const getCoordinatesAndPlaceShip = (element, length) => {
	element.addEventListener('click', (e) => {
		let x = Math.floor(e.target.id / 10);
		let y = e.target.id % 10;

		//placing ships on my board
		const axisValue = document.getElementById('axis-value').innerHTML;

		firstGameBoard.placeShip(length, {value: axisValue}, {x: x, y: y});
		updateBoard(gameBoardContainer, firstGameBoard.board, 'my-board');
	});
};

export {
	displayBoard,
	changeAxis,
	locateShip,

	gameBoardContainer,
	enemyGameBoardContainer
}