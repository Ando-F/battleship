import {Ship} from "../src/Ship";

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