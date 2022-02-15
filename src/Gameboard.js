import {Ship} from "./Ship";

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
		} else if (board[coordinates.x][coordinates.y] === 0) {
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

export {
	Gameboard
}