import {Ship, Player, Gameboard} from "./factories";

//testing Ship factory function
test('hit four deck ship', () => {
	let fourDeckShip = Ship(4, {value: 'x'}, {x: 1, y: 1});
	fourDeckShip.hit();
	fourDeckShip.hit()
	expect(fourDeckShip.injuredDecks.value).toEqual(2);
});

test('sunk status of injured ship', () => {
	let twoDeckShip = Ship(2, {value: 'x'}, {x: 1, y: 1});
	twoDeckShip.hit();
	expect(twoDeckShip.sunkStatus.value).toBe(false);
});

//testing board
test('is the board right', () => {
	const firstGameboard = Gameboard();
	expect(firstGameboard.board).toEqual([[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]);
});

//testing ships placement
test('add fourDeckShip to the board, y axis', () => {
	const firstGameboard = Gameboard();
	firstGameboard.placeShip(4, {value: 'y'}, {x: 0, y: 1});
	let filledPlaces = 0;
	for (let i = 1, j = 0; j < 4; i++, j++) {
		filledPlaces += firstGameboard.board[0][i];
	}
	expect(filledPlaces).toBe(4);
});

test('add fourDeckShip to the board, x axis', () => {
	const firstGameboard = Gameboard();
	firstGameboard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	let filledPlaces = 0;
	for (let i = 1, j = 0; j < 4; i++, j++) {
		filledPlaces += firstGameboard.board[1][1];
	}
	expect(filledPlaces).toBe(4);
});

test('add fourDeckShip to the board, x axis', () => {
	const firstGameboard = Gameboard();
	firstGameboard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	expect(firstGameboard.board[4][1]).toBe(1);
});

test('are there any ships in ships array', () => {
	const firstGameboard = Gameboard();
	firstGameboard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	expect(firstGameboard.ships.length).toBe(1);
});

test('are there any ships in ships array', () => {
	const firstGameboard = Gameboard();
	firstGameboard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	firstGameboard.placeShip(3, {value: 'y'}, {x: 7, y: 3});
	expect(firstGameboard.ships.length).toBe(2);
});

test('does ship has coordinates inside', () => {
	const firstGameboard = Gameboard();
	firstGameboard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	expect(firstGameboard.ships[0].coordinatesOnBoard[1]).toEqual({x: 2, y: 1});
});

test('check if we can hit the ship', () => {
	const gameBoard = Gameboard();
	gameBoard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	gameBoard.recieveAttack({x: 3, y: 1});
	expect(gameBoard.ships[0].injuredDecks.value).toEqual(1);
});

test('can we hit second ship in array', () => {
	const gameBoard = Gameboard();
	gameBoard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	gameBoard.placeShip(1, {value: 'y'}, {x: 7, y: 7});
	gameBoard.recieveAttack({x: 7, y: 7});
	expect(gameBoard.ships[1].injuredDecks.value).toBe(1);
});

test('successful shot marked as 2', () => {
	const gameBoard = Gameboard();
	gameBoard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	gameBoard.placeShip(1, {value: 'y'}, {x: 7, y: 7});
	gameBoard.recieveAttack({x: 7, y: 7});
	expect(gameBoard.board[7][7]).toBe(2);
});

test('missed shot marked as 2', () => {
	const gameBoard = Gameboard();
	gameBoard.placeShip(4, {value: 'x'}, {x: 1, y: 1});
	gameBoard.placeShip(1, {value: 'y'}, {x: 7, y: 7});
	gameBoard.recieveAttack({x: 7, y: 8});
	expect(gameBoard.board[7][8]).toBe(3);
});

test('get ship sunk status in array of ships from the board', () => {
	const gameBoard = Gameboard();
	gameBoard.placeShip(1, {value: 'x'}, {x: 1, y: 1});
	gameBoard.recieveAttack({x: 1, y: 1});
	expect(gameBoard.ships[0].sunkStatus.value).toBe(true);
});

test('if board can tell if all ships are sunk', () => {
	const gameBoard = Gameboard();
	gameBoard.placeShip(1, {value: 'x'}, {x: 1, y: 1});
	gameBoard.recieveAttack({x: 1, y: 1});
	expect(gameBoard.gameStatus.status).toBe('off');
});

test('same test two ships, must be off', () => {
	const gameBoard = Gameboard();
	gameBoard.placeShip(1, {value: 'x'}, {x: 1, y: 1});
	gameBoard.placeShip(1, {value: 'x'}, {x: 5, y: 5});
	gameBoard.recieveAttack({x: 1, y: 1});
	expect(gameBoard.gameStatus.status).toBe('on');
});

test('place ship with random coordinates', () => {
	const gameBoard = Gameboard();
	const computer = Player();
	gameBoard.placeShip(1, {value: 'x'}, computer.calculateCoordinatesForAI());
	expect(gameBoard.ships.length).toBe(1);
});