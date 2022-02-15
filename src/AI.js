const randomCoordinates = () => {
    return {x: Math.floor(Math.random() * 10) + 1, y: Math.floor(Math.random() * 10) + 1};
}

const checkCoordinates = (coordinates, board) => {
    if (board[coordinates.x][coordinates.y] === 1 || board[coordinates.x][coordinates.y] === 0) {
        return true;
    } else {
        return false;
    }
}

const properCoordinates = (board) => {
    let coordinates = randomCoordinates();
    while (checkCoordinates(coordinates, board) !== true) {
        coordinates = randomCoordinates();
    }
    return coordinates;
}

export {randomCoordinates, checkCoordinates, properCoordinates}