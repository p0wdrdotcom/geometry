const Point2D = require('./Point2D.js');



function Pose2D(_x, _y, _theta) {

    const x = _x != null ? _x : 0.0;
    const y = _y != null ? _y : 0.0;
    const theta = _theta != null ? _theta : 0.0;

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

    return Object.freeze({
        TYPE: 'Pose2D',
        '0': x,
        '1': y,
        x,
        y,
        clone,
        angle,
        angleDegrees,
        asPoint,
        asArray,
        move
    });

}

module.exports = Object.freeze(Pose2D);