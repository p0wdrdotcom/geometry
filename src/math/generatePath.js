const randomInteger = require('./randomInteger.js');
const randomNumber = require('./randomNumber.js');
const degreesToRadians = require('./degreesToRadians.js');
const MAX_THETA_DEG = 90;
const MAX_DISTANCE = 10.0;
const MIN_DISTANCE = 1.5;


function generatePath(origin, steps, path) {

    const returnPath = path || [];

    returnPath.push(origin);

    const theta = degreesToRadians(
        randomInteger(MAX_THETA_DEG) * (Math.random() > 0.5 ? -1 : 1)
    );

    const distance = randomNumber(
        MIN_DISTANCE, MAX_DISTANCE
    );

    const x = origin.x + distance * Math.cos(theta);
    const y = origin.y + distance * Math.sin(theta);

    const newPoint = {
        x, y
    };

    if (returnPath.length >= steps) {
        return returnPath;
    }

    return generatePath(newPoint, steps, returnPath);
}

module.exports = generatePath;