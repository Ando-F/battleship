const Player = () => {
	let xArray;
	let yArray;

	let numbersX = [];
	let numbersY = [];

	const createArray = (length, axis) => {
		if (axis === 'x') {
			xArray = Array.from(Array(10 - length).keys());
			yArray = Array.from(Array(10).keys());
		} else if (axis === 'y') {
			xArray = Array.from(Array(10).keys());
			yArray = Array.from(Array(10 - length).keys());
		}
	}

	const randomCoordinates = (length, axis) => {
		if (length === 1) {
			xArray = Array.from(Array(10).keys());
			yArray = Array.from(Array(10).keys());
		} else if (length === 2) {
			createArray(2, axis);
		} else if (length === 3) {
			createArray(3, axis);
		} else if (length === 4) {
			createArray(4, axis);
		}

		let x = xArray[Math.floor(Math.random()*xArray.length)];
		let indexOfX = xArray.indexOf(x);
		xArray.splice(indexOfX, 1);

		let y = yArray[Math.floor(Math.random()*yArray.length)];
		let indexOfY = yArray.indexOf(y);
		yArray.splice(indexOfY, 1);

		return {x: x, y: y};
	};

	const checkBoard = (board) => {
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				if (board[i][j] === 1) {
					numbersX.push(i);
					numbersY.push(j);
				}
			}
		}
	}

	const randomAxis = () => {
		let randomNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);

		if (randomNumber === 1) {
			return 'x';
		} else {
			return 'y';
		}
	}

	return {randomAxis, randomCoordinates, xArray, yArray, checkBoard, numbersY, numbersX};
}

export {
	Player
}