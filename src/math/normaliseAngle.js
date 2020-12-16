const TWO_PI = Math.PI * 2.0;

function normaliseAngle(theta) {
    return theta - TWO_PI * Math.floor((theta + Math.PI) / TWO_PI);
}

module.exports = normaliseAngle;