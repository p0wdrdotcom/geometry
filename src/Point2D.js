const pt = require('./math/transform').perspectiveTransform;
const t3d = require('./math/transform').transform3D;

function Point2D(_x, _y) {

    const x = _x != null ? _x : 0.0;
    const y = _y != null ? _y : 0.0;

    function clone() {
        return new Point2D(x, y);
    }

    function asArray() {
        return [x, y];
    }

    function distance(point) {
        const xDiff = Math.pow(Math.abs(x - point.x), 2);
        const yDiff = Math.pow(Math.abs(y - point.y), 2);
        return Math.sqrt(xDiff + yDiff);
    }

    function angleTo(point) {
        return (Math.PI * 1.5 + Math.atan2(point.y - y, point.x - x)) % (Math.PI * 2.0);
    }

    function equals(point) {
        return point.x === x && point.y === y;
    }

    function perspectiveTransform(H) {
        const tp = pt(H, x, y);
        return new Point2D(tp.x, tp.y);
    }

    function transform(mat) {
        const tp = t3d(mat, x, y, 0);
        return new Point2D(tp.x, tp.y);
    }

    return Object.freeze({
        '0': x,
        '1': y,
        x,
        y,
        clone,
        asArray,
        distance,
        angleTo,
        equals,
        perspectiveTransform,
        transform
    });

}


Point2D.fromArray = function(arr) {
    return new Point2D(arr[0], arr[1]);
};

module.exports = Object.freeze(Point2D);