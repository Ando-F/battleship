import {checkCoordinates} from "../src/AI";
import {Gameboard} from "../src/Gameboard";

const gameBoard = Gameboard();

test('check coordinates', () => {
    gameBoard.placeShip(2, {axis: 'x'}, {x: 1, y: 1});
    gameBoard.recieveAttack({x: 1, y: 1});
    gameBoard.recieveAttack({x: 0, y: 0});
    expect(checkCoordinates({x: 1, y: 0}, gameBoard.board)).toBe(true);
})