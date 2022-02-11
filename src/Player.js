import {Gameboard} from "./Gameboard";

const Player = () => {
	let xArray;
	let yArray;

	let numbersX = [];
	let numbersY = [];

	//filling array with right amount of numbers
	const fillArray = (length, axis) => {
		xArray = [];
		yArray = [];

		const createArray = (array, length) => {
			for (let i = 0; i < length; i++) {
				array.push(i);
			}
		}

		const arrayOptions = (length, axis) => {
			if (axis === 'x') {
				createArray(xArray, 10 - length + 1);
				createArray(yArray, 10);
			} else if (axis === 'y') {
				createArray(xArray, 10);
				createArray(yArray, 10 - length + 1)
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

		console.log('original X', xArray);
		console.log('original Y', yArray);
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

	const cleanArray = (arrayToClean, arrayToRead) => {
		for (let i = 0; i < arrayToClean.length; i++) {
			for (let j = 0; j < arrayToRead.length; j++) {
				if (arrayToClean[i] === arrayToRead[j]) {
					arrayToClean.splice(i, 1);
				}
			}
		}
	}

	const randomCoordinates = () => {
		let x = xArray[Math.floor(Math.random() * xArray.length)];
		let y = yArray[Math.floor(Math.random() * yArray.length)];

		return {x: x, y: y};
	};

	const refactorArrays = (board) => {
		checkBoard(board);
		cleanArray(xArray, numbersX);
		cleanArray(yArray, numbersY);

		console.log('numbers X: ', numbersX);
		console.log('numbers Y: ', numbersY);

		console.log('refactored X: ', xArray);
		console.log('refactored Y: ', yArray);
	}

	const randomAxis = () => {
		let randomNumber = Math.floor(Math.random() * 2);

		if (randomNumber === 0) {
			return 'x';
		} else {
			return 'y';
		}
	}
	//we export fillArray and checkBoard for tests – we need the locally only (the same with arrays)
	return {randomAxis, randomCoordinates, checkBoard, fillArray, cleanArray, refactorArrays, xArray, yArray, numbersY, numbersX};
}

export {
	Player
}