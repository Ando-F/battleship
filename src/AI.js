let randomCoordinates = [];

// create array with all numbers we need
for (let i = 0; i < 100; i++) {
    randomCoordinates.push(i);
}

// shuffle array
for (let j = 100 - 1; j >= 0; j--) {
    let swapIndex = Math.floor(Math.random() * j);
    let tmp = randomCoordinates[swapIndex];
    randomCoordinates[swapIndex] = randomCoordinates[j];
    randomCoordinates[j] = tmp;
}


const returnRandomCoordinates = () => {
    let x = Math.floor(randomCoordinates[0] / 10);
    let y = randomCoordinates[0] % 10;
    randomCoordinates.shift();
    return {x: x, y: y};
}
export {randomCoordinates, returnRandomCoordinates}