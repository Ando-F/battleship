const Ship = (length, axis, coordinates) => {
	let injuredDecks = {value: 0};

	let coordinatesOnBoard = {};
	coordinatesOnBoard[0] = coordinates;
	if (axis.value === 'x' && length > 1) {
		for (let i = 1; i <= length; i++) {
			coordinatesOnBoard[i] = {x: coordinates.x + i, y: coordinates.y};
		}
	} else if (axis.value === 'y' && length > 1) {
		for (let i = 1; i <= length; i++) {
			coordinatesOnBoard[i] = {x: coordinates.x, y: coordinates.y + i};
		}
	}

	let sunkStatus = {value: false};

	const hit = () => {
		injuredDecks.value += 1;
		isSunk();
	}

	const isSunk = () => {
		if (injuredDecks.value === length) {
			sunkStatus.value = true;
		}
	};

	return {length, injuredDecks, coordinatesOnBoard,sunkStatus, hit, isSunk};
};

const Gameboard = () => {
	//an array to store all the created ships
	const ships = [];

	//the actual board
	let board = [];
	for (let i = 0; i < 10; i++) {
		board[i] = [];
		for (let j = 0; j < 10; j++) {
			board[i][j] = 0;
		}
	}

	const placeShip = (length, axis, coordinates) => {
		ships.push(Ship(length, axis, coordinates));
		if (axis.value === 'y') {
			for (let i = coordinates.y, j = 0; j < length; i++, j++) {
				board[coordinates.x][i] = 1;
			}
		} else if (axis.value === 'x') {
			for (let i = coordinates.x, j = 0; j < length; i++, j++) {
				board[i][coordinates.y] = 1;
			}
		}
	};

	//what numbers on the desk stand for:
	//0 is for free cell, 1 is for taken cell, 2 is for cell with hitted ship,
	//3 is for missed shot
	const recieveAttack = (coordinates) => {
		if (board[coordinates.x][coordinates.y] === 1) {
			board[coordinates.x][coordinates.y] = 2;
			for (let i = 0; i < ships.length; i++) {
				for (let j = 0; j < Object.keys(ships[i].coordinatesOnBoard).length; j++) {
					if ((ships[i].coordinatesOnBoard[j].x === coordinates.x) && (ships[i].coordinatesOnBoard[j].y === coordinates.y)) {
						ships[i].hit();
						break;
					}
				}
			}
			checkGameStatus();
		} else {
			board[coordinates.x][coordinates.y] = 3;
		}
	};

	let gameStatus = {status: 'on'};
	const checkGameStatus = () => {
		gameStatus.status = 'off';
		for (let i = 0; i < ships.length; i++) {
			if (ships[i].sunkStatus.value === false) {
				gameStatus.status = 'on';
				break;
			}
		}
	};

	return {board, ships, placeShip, recieveAttack, gameStatus};
};

const Player = () => {
	let xArray = Array.from(Array(10).keys());
	let yArray = Array.from(Array(10).keys());

	const calculateCoordinatesForAI = () => {
		let x = xArray[Math.floor(Math.random()*xArray.length)];
		let indexOfX = xArray.indexOf(x);
		xArray.splice(indexOfX, 1);

		let y = yArray[Math.floor(Math.random()*yArray.length)];
		let indexOfY = yArray.indexOf(y);
		yArray.splice(indexOfY, 1);

		return {x: x, y: y};
	};

	return {calculateCoordinatesForAI};
}

export {
	Ship,
	Gameboard,
	Player
}