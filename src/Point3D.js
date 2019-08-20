
function Point3D(_x, _y, _z) {

    const x = _x != null ? _x : 0.0;
    const y = _y != null ? _y : 0.0;
    const z = _z != null ? _z : 0.0;

    function asArray() {
        return [x, y, z];
    }

    function clone() {
        return new Point3D(x, y, z);
    }

    function equals(point) {
        return point.x === x && point.y === y && point.z === z;
    }

    function distance(point) {
        const xDiff = Math.pow(Math.abs(x - point.x), 2);
        const yDiff = Math.pow(Math.abs(y - point.y), 2);
        const zDiff = Math.pow(Math.abs(z - point.z), 2);
        return Math.sqrt(xDiff + yDiff + zDiff);
    }

    // The dot product of two 3D points
    function dot(point) {
        return x * point.x + y * point.y + z * point.z;
    }

    function lengthSquared() {
        return x * x + y * y + z * z;
    }

    // In terms of a Vector
    function length() {
        return Math.sqrt(lengthSquared());
    }

    // Angle in radians to another 3D point
    function angleTo(point) {
        const theta = dot(point) / (Math.sqrt(lengthSquared() * point.lengthSquared()));
        return Math.acos(Math.max(-1, Math.min(1, theta)));
    }

    // As a normalised Vector
    function direction(point) {
        const dP = new Point3D(x - point.x, y - point.y, z - point.z);
        const m = 1.0 / dP.length();
        return [dP.x * m, dP.y * m, dP.z * m];
    }

    return Object.freeze({
        '0': x,
        '1': y,
        '2': z,
        x,
        y,
        z,
        asArray,
        clone,
        equals,
        distance,
        angleTo,
        length,
        direction
    });

}

Point3D.fromArray = function(arr) {
    return new Point3D(arr[0], arr[1], arr[2]);
};

module.exports = Point3D;