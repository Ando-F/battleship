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