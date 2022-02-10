const Player = () => {
	let xArray = [];
	let yArray = [];

	let numbersX = [];
	let numbersY = [];

	//filling array with right amount of numbers
	const fillArray = (length, axis) => {
		const createArray = (array, length) => {
			for (let i = 0; i < length; i++) {
				array.push(i);
			}
		}

		const arrayOptions = (length, axis) => {
			if (axis === 'x') {
				createArray(xArray, 10 - length);
				createArray(yArray, 10);
			} else if (axis === 'y') {
				createArray(xArray, 10);
				createArray(yArray, 10 - length)
			}
		}

		if (length === 1) {
			createArray(xArray, 10);
			createArray(yArray, 10);
		} else if (length === 2) {
			arrayOptions(2, axis);
		} else if (length === 3) {
			arrayOptions(3, axis);
		} else if (length === 4) {
			arrayOptions(4, axis);
		}
	}

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

	const randomCoordinates = (length, axis) => {
		fillArray(length, axis);

		let x = xArray[Math.floor(Math.random()*xArray.length)];
		let indexOfX = xArray.indexOf(x);
		xArray.splice(indexOfX, 1);

		let y = yArray[Math.floor(Math.random()*yArray.length)];
		let indexOfY = yArray.indexOf(y);
		yArray.splice(indexOfY, 1);

		return {x: x, y: y};
	};

	const randomAxis = () => {
		let randomNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1);

		if (randomNumber === 1) {
			return 'x';
		} else {
			return 'y';
		}
	}

	return {randomAxis, randomCoordinates, checkBoard, fillArray, xArray, yArray, numbersY, numbersX};
}

export {
	Player
}