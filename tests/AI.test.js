import {randomCoordinates} from "../src/AI";

test('check length of array', () => {
    expect(randomCoordinates.length).toBe(100);
})