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

    function transform(mat) {
        const tX = (mat[0] * x + mat[1] * y + mat[2]) / (mat[6] * x + mat[7] * y + 1);
        const tY = (mat[3] * x + mat[4] * y + mat[5]) / (mat[6] * x + mat[7] * y + 1);
        return new Point2D(tX, tY);
    }

    return Object.freeze({
        '0': x,
        '1': y,
        x,
        y,
        clone,
        asArray,
        distance,
        transform
    });

}


Point2D.fromArray = function(arr) {
    return new Point2D(arr[0], arr[1]);
};

module.exports = Object.freeze(Point2D);