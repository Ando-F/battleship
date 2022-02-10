import {Gameboard} from "../src/Gameboard";
import {Player} from "../src/Player";

test('place ship with random coordinates', () => {
	const gameBoard = Gameboard();
	const computer = Player();
	gameBoard.placeShip(1, {value: 'x'}, computer.randomCoordinates(1, 'x'));
	expect(gameBoard.ships.length).toBe(1);
});

test('can we check gameboard', () => {
	const gameboard = Gameboard();
	const computer = Player();
	gameboard.placeShip(2, {value: 'x'}, {x: 1, y: 2});
	computer.checkBoard(gameboard.board);
	expect(computer.numbersX[1]).toBe(2);
})

test('can we check gameboard – numbersY have the all same numbers', () => {
	const gameboard = Gameboard();
	const computer = Player();
	gameboard.placeShip(2, {value: 'x'}, {x: 1, y: 2});
	computer.checkBoard(gameboard.board);
	expect(computer.numbersY[1]).toBe(2);
})

test('create right array', () => {
	const computer = Player();
	computer.fillArray(2, 'x');
	expect(computer.xArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
})

test('create right array (y)', () => {
	const computer = Player();
	computer.fillArray(2, 'x');
	expect(computer.yArray).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
})

test('remove occupied numbers from arrays', () => {
	const gameBoard = Gameboard();
	const computer = Player();

	gameBoard.placeShip(2, {value: 'x'}, {x: 1, y: 2});
	computer.fillArray(2, 'x');
	computer.checkBoard(gameBoard.board);
	computer.cleanArray(computer.xArray, computer.numbersX);
	expect(computer.xArray).toEqual([0, 3, 4, 5, 6, 7]);
})