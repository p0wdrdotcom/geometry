const math = require('./math');

const Point2D = require('./Point2D');
const Line2D = require('./Line2D');

function Polygon2D(_points) {
    const points = _points;

    function asPoints() {
        return points;
    }

    function edges() {
        const count = points.length;
        const edges = [];

        /* eslint-disable no-plusplus */
        for (let i = 0; i < count; i++) {
            /* eslint-enable no-plusplus */
            let nextIndex = i + 1;

            if (nextIndex >= count) {
                nextIndex = 0;
            }
            const p1 = points[i].clone();
            const p2 = points[nextIndex].clone();
            edges.push(new Line2D(p1, p2));
        }
        return edges;
    }

    function dedup() {
        const newPoints = points.slice();
        /* eslint-disable no-plusplus */
        for (let i = newPoints.length - 1; i >= 0; i--) {
            /* eslint-enable no-plusplus */
            let keep = true;
            /* eslint-disable no-plusplus */
            for (let j = newPoints.length - 1; j >= 0; j--) {
                /* eslint-enable no-plusplus */
                if (i === j) {
                    continue;
                }
                if (newPoints[i].distance(newPoints[j]) === 0.0) {
                    keep = false;
                }
            }
            if (keep === false) {
                newPoints.splice(i, 1);
            }
        }

        return new Polygon2D(newPoints);
    }

    function perimeter() {
        return points.reduce(function(sum, next) {
            return sum + next.length();
        }, 0.0);
    }

    function centroid() {

        const centroid = {
            x: 0,
            y: 0
        };

        let signedArea = 0.0;

        let x0 = 0.0;
        let y0 = 0.0;
        let x1 = 0.0;
        let y1 = 0.0;
        let pArea = 0.0; // Partial signed area

        const numPoints = points.length;

        // Iterate over all the points except the last one
        /* eslint-disable no-plusplus */
        for (let i = 0; i < numPoints - 1; i++) {
            /* eslint-enable no-plusplus */
            x0 = points[i].x;
            y0 = points[i].y;
            x1 = points[i + 1].x;
            y1 = points[i + 1].y;
            pArea = x0 * y1 - x1 * y0;
            signedArea += pArea;
            centroid.x += (x0 + x1) * pArea;
            centroid.y += (y0 + y1) * pArea;
        }

        // Do the last and the first manually
        x0 = points[numPoints - 1].x;
        y0 = points[numPoints - 1].y;
        x1 = points[0].x;
        y1 = points[0].y;
        pArea = (x0 * y1) - (x1 * y0);
        signedArea += pArea;
        centroid.x += (x0 + x1) * pArea;
        centroid.y += (y0 + y1) * pArea;

        signedArea *= 0.5;
        centroid.x /= (6.0 * signedArea);
        centroid.y /= (6.0 * signedArea);

        return new Point2D(centroid.x, centroid.y);
    }

    function rotate(radians, origin) {
        const mat = math.transform.generateZAxisRotationMatrix(radians);
        const c = origin == null ? centroid() : origin;

        const resultPoints = points.map(function(point) {
            return new Point2D(point.x - c.x, point.y - c.y);
        }).map(function(point) {
            return point.transform(mat);
        }).map(function(point) {
            return new Point2D(point.x + c.x, point.y + c.y);
        });

        return new Polygon2D(resultPoints);
    }

    function rotateY(radians, origin) {
        const mat = math.transform.generateYAxisRotationMatrix(radians);
        const c = origin == null ? centroid() : origin;

        const resultPoints = points.map(function(point) {
            return new Point2D(point.x - c.x, point.y - c.y);
        }).map(function(point) {
            return point.transform(mat);
        }).map(function(point) {
            return new Point2D(point.x + c.x, point.y + c.y);
        });

        return new Polygon2D(resultPoints);
    }

    function rotateX(radians, origin) {
        const mat = math.transform.generateXAxisRotationMatrix(radians);
        const c = origin == null ? centroid() : origin;

        const resultPoints = points.map(function(point) {
            return new Point2D(point.x - c.x, point.y - c.y);
        }).map(function(point) {
            return point.transform(mat);
        }).map(function(point) {
            return new Point2D(point.x + c.x, point.y + c.y);
        });

        return new Polygon2D(resultPoints);
    }

    function scale(s, origin) {
        const mat = math.transform.generateScaleMatrix(s, s, 0);

        const c = origin == null ? centroid() : origin;
        const resultPoints = points.map(function(point) {
            return new Point2D(point.x - c.x, point.y - c.y);
        }).map(function(point) {
            return point.transform(mat);
        }).map(function(point) {
            return new Point2D(point.x + c.x, point.y + c.y);
        });

        return new Polygon2D(resultPoints);
    }

    function boundingBox() {

        let minX = Infinity;
        let minY = Infinity;
        let maxX = 0;
        let maxY = 0;

        minX = points.reduce(function(m, point) {
            return Math.min(m, point.x);
        }, minX);

        minY = points.reduce(function(m, point) {
            return Math.min(m, point.y);
        }, minY);

        maxX = points.reduce(function(m, point) {
            return Math.max(m, point.x);
        }, maxX);

        maxY = points.reduce(function(m, point) {
            return Math.max(m, point.y);
        }, maxY);

        return [
            new Point2D(minX, minY),
            new Point2D(maxX, minY),
            new Point2D(maxX, maxY),
            new Point2D(minX, maxY)
        ];
    }

    function topMostPoint() {
        return points.reduce(function(pp, pn) {
            if (pp == null) {
                return pn;
            }
            if (pn.y < pp.y) {
                return pn;
            }
            return pp;
        }, null);
    }

    function perspectiveTransform(mat) {
        return new Polygon2D(points.map(function(point) {
            return point.perspectiveTransform(mat);
        }));
    }

    return Object.freeze({
        asPoints,
        edges,
        dedup,
        perimeter,
        centroid,
        boundingBox,
        topMostPoint,
        perspectiveTransform,
        rotate,
        rotateY,
        rotateX,
        scale
    });
}

Polygon2D.fromArray = function(arr) {
    const points = arr.map(function(p) {
        return new Point2D(p[0], p[1]);
    });
    return new Polygon2D(points);
};

module.exports = Object.freeze(Polygon2D);