
const normaliseAngle = require('./math/normaliseAngle.js');

const Point2D = require('./Point2D.js');

const TYPE_NAME = 'Pose2D';

function Pose2D(_x, _y, _theta) {

    const x = _x != null ? _x : 0.0;
    const y = _y != null ? _y : 0.0;
    const theta = normaliseAngle(_theta != null ? _theta : 0.0);

    function move(distance) {
        return new Pose2D(
            x + distance * Math.cos(theta),
            y + distance * Math.sin(theta),
            theta
        );
    }

    function asPoint() {
        return new Point2D(x, y);
    }

    function asArray() {
        return [x, y, theta];
    }

    function angle() {
        return theta;
    }

    function angleDegrees() {
        return theta * (180.0 / Math.PI);
    }

    function clone() {
        return new Pose2D(x, y, theta);
    }

    function rotate(radians) {
        const newTheta = normaliseAngle(theta + radians);
        return new Pose2D(x, y, newTheta);
    }

    return Object.freeze({
        TYPE: TYPE_NAME,
        '0': x,
        '1': y,
        '2': theta,
        x,
        y,
        theta,
        clone,
        angle,
        angleDegrees,
        asPoint,
        asArray,
        move,
        rotate
    });

}

Pose2D.fromArray = function(arr) {
    if (!Array.isArray(arr)) {
        return null;
    }

    if (arr.length !== 3) {
        return null;
    }

    return new Pose2D(arr[0], arr[1], arr[2]);
};

Pose2D.TYPE = TYPE_NAME;

module.exports = Object.freeze(Pose2D);