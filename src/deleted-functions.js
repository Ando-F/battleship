//ability to change axis string value by click
import {clearBox} from "./help-functions";
import {displayBoard} from "./dom";

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

const getCoordinatesAndPlaceShip = (length) => {
	document.querySelectorAll('.my-board').forEach((cell) => {
		cell.addEventListener('click', (e) => {
			let x = Math.floor(e.target.id / 10);
			let y = e.target.id % 10;

			//placing ships on my board
			const axisValue = document.getElementById('axis-value').innerHTML;
			firstGameBoard.placeShip(length, {value: axisValue}, {x: x, y: y});
			updateBoard(gameBoardContainer, firstGameBoard.board, 'my-board', length);
		});
	})
};

//change cell's color on event
const changeColorOnHover = (element, listener, color) => {
	element.addEventListener(listener, () => {
		element.style.background = color;
	});
};

const addColorListenersToEachCell = (elements) => {
	elements.forEach((cell) => {
		changeColorOnHover(cell, 'mouseover', 'yellow');
		changeColorOnHover(cell, 'mouseout', 'white');
	})
}

const updateBoard = (container, board, elementClass, length) => {
	clearBox(container);
	displayBoard(board, container, elementClass);
	getCoordinatesAndPlaceShip(length);
}