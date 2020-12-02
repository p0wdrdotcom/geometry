const Point3D = require('./Point3D.js');

function PointCloud3D() {

    const points = [];

    function addPoint(point) {
        points.push(point);
    }

    function size() {
        return points.length;
    }

    function get(index) {
        if (points.size() < 1) {
            return null;
        }
        if (index > points.size() - 1) {
            return null;
        }
        if (null == index) {
            return null;
        }

        return points[index].clone();
    }

    function centroid() {

        const pointsSum = points.reduce(function(current, point) {

            return [
                current[0] += point[0],
                current[1] += point[1],
                current[2] += point[2]
            ];

        }, [0, 0, 0]);

        return Point3D.fromArray(pointsSum.map(function(coord) {
            return coord * (1.0 / points.size());
        }));
    }

    function asArray() {
        return points.slice();
    }


    return Object.freeze({
        TYPE: 'PointCloud3D',
        addPoint,
        get,
        asArray,
        centroid,
        size
    });

}


PointCloud3D.fromArray = function(arr) {

    const aCloud = new PointCloud3D();

    arr.forEach(aCloud.addPoint);

    return aCloud;

};

module.exports = Object.freeze(PointCloud3D);