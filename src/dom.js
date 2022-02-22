import {updateBoard} from "./help-functions";
import {enemyBoard, firstGameBoard} from "./index";
import {returnRandomCoordinates} from "./AI";
import {Ship} from "./Ship";

const gameBoardContainer = document.getElementById("game-board");
const enemyGameBoardContainer = document.getElementById("enemy-game-board");

const displayBoard = (board, container, uniqueClass) => {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			const oneCell = document.createElement('div');
			oneCell.classList.add('cell');
			oneCell.classList.add(uniqueClass);
			oneCell.id = (i * 10) + j;

			// adding colors to cell background
			if (board[i][j] === 1) {
				oneCell.style.background = 'lightblue';
			} else if (board[i][j] === 2) {
				oneCell.style.background = 'red';
			} else if (board[i][j] === 3) {
				oneCell.style.background = 'lightgreen';
			} else {
				oneCell.style.background = 'white';
			}

			container.appendChild(oneCell);
		}
	}
};

// adding event listeners to all cells using Event Delegation
enemyGameBoardContainer.addEventListener('click', (e) => {
	if (e.target && e.target.nodeName === 'DIV' && (e.target.style.background === 'white' || e.target.style.background === 'lightblue')) {
		let x = Math.floor(e.target.id / 10);
		let y = e.target.id % 10;

		enemyBoard.recieveAttack({x: x, y: y});
		updateBoard(enemyGameBoardContainer, enemyBoard.board, 'enemy-board');

		firstGameBoard.recieveAttack(returnRandomCoordinates());
		updateBoard(gameBoardContainer, firstGameBoard.board, 'my-board');

		if (checkStatus(enemyBoard.ships) === true) {
			createPopUp('You Win');
		} else if (checkStatus(firstGameBoard.ships) === true) {
			createPopUp('You Lose');
		}
	}
})

// amount of all ships we placed
let four = 0;
let three = 0;
let two = 0;
let one = 0;

// allowing ship placement by clicking cells
gameBoardContainer.addEventListener('click', (e) => {
	const placeShipOnClick = (length) => {
		let x = Math.floor(e.target.id / 10);
		let y = e.target.id % 10;

		//placing ships on my board
		const axisValue = document.getElementById('axis-value').innerHTML;
		firstGameBoard.placeShip(length, {value: axisValue}, {x: x, y: y});
		updateBoard(gameBoardContainer, firstGameBoard.board, 'my-board');
	}

	if (e.target && e.target.nodeName === 'DIV' && four < 1) {
		placeShipOnClick(4);
		four++;
	} else if (e.target && e.target.nodeName === 'DIV' && three < 2){
		placeShipOnClick(3);
		three++;
	} else if (e.target && e.target.nodeName === 'DIV' && two < 3) {
		placeShipOnClick(2);
		two++;
	} else if (e.target && e.target.nodeName === 'DIV' && one < 4) {
		placeShipOnClick(1);
		one++;
	}
})

const checkStatus = (array) => {
	let sunkFinalStatus = false;
	for (let i = 0; i < array.length; i++) {
		sunkFinalStatus = true;
		if (array[i].sunkStatus.value === false) {
			sunkFinalStatus = false;
			break;
		}
	}
	return sunkFinalStatus;
}

const createPopUp = (message) => {
	const messageWindow = document.createElement('div');
	messageWindow.classList.add('pop-up');
	messageWindow.innerHTML = message;
	document.querySelector('body').appendChild(messageWindow);
}

export {
	displayBoard,

	gameBoardContainer,
	enemyGameBoardContainer
}