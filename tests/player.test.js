import {Gameboard} from "../src/Gameboard";
import {Player} from "../src/Player";

test('place ship with random coordinates', () => {
	const gameBoard = Gameboard();
	const computer = Player();
	gameBoard.placeShip(1, {value: 'x'}, computer.randomCoordinates(1, 'x'));
	expect(gameBoard.ships.length).toBe(1);
});