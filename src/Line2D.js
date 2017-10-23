const Point2D = require('./Point2D.js');

function Line2D(_p1, _p2) {
    const p1 = _p1;
    const p2 = _p2;

    function asArray() {
        return [
            p1.asArray(),
            p2.asArray()
        ];
    }

    function start() {
        return p1;
    }

    function end() {
        return p2;
    }

    function length() {
        return p1.distance(p2);
    }

    function midpoint() {
        return new Point2D((p1.x + p2.x) / 2.0, (p1.y + p2.y) / 2.0);
    }

    function slope() {
        return (p2.y - p1.y) / (p2.x - p1.x);
    }

    function perspectiveTransform(H) {
        return new Line2D(p1.perspectiveTransform(H), p2.perspectiveTransform(H));
    }

    function pointAtX(x) {
        const y = p1.y + (x - p1.x) * slope();
        return new Point2D(x, y);
    }

    function pointAtY(y) {
        const x = p1.x + (y - p1.y) / slope();
        return new Point2D(x, y);
    }

    function pointAtMagnitude(magnitude) {
        const t = magnitude / length();
        const x = ((1.0 - t) * (p1.x) + (t * p2.x));
        const y = ((1.0 - t) * (p1.y) + (t * p2.y));
        return new Point2D(x, y);
    }

    function nearestPoint(p) {
        const d = length();

        if (d === 0) {
            return new Point2D(p1.x, p1.y);
        }
        let t = ((p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y)) / Math.pow(d, 2);
        t = Math.max(0, Math.min(1, t));

        const x = p1.x + t * (p2.x - p1.x);
        const y = p1.y + t * (p2.y - p1.y);

        return new Point2D(x, y);
    }

    function parallelLine(offset) {
        const d = length();
        const x1p = p1.x + offset * (p2.y - p1.y) / d;
        const y1p = p1.y + offset * (p1.x - p2.x) / d;
        const x2p = p2.x + offset * (p2.y - p1.y) / d;
        const y2p = p2.y + offset * (p1.x - p2.x) / d;

        const nP1 = new Point2D(x1p, y1p);
        const nP2 = new Point2D(x2p, y2p);

        return new Line2D(nP1, nP2);
    }

    function perpendicularLine(_c, _pos, _neg) {
        const d = length();
        const c = _c == null ? midpoint() : _c;
        const pos = _pos != null ? _pos : d / 2;
        const neg = _neg != null ? _neg : pos;

        const x1p = c.x + pos * (p2.y - p1.y) / d;
        const y1p = c.y + pos * (p1.x - p2.x) / d;
        const x2p = c.x - neg * (p2.y - p1.y) / d;
        const y2p = c.y - neg * (p1.x - p2.x) / d;

        const nP1 = new Point2D(x1p, y1p);
        const nP2 = new Point2D(x2p, y2p);

        return new Line2D(nP1, nP2);
    }

    function intersection(line) {

        let x = null;
        let y = null;

        const x1 = p1.x;
        const x2 = p2.x;
        const x3 = line.start().x;
        const x4 = line.end().x;

        const y1 = p1.y;
        const y2 = p2.y;
        const y3 = line.start().y;
        const y4 = line.end().y;

        const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        const numera = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
        const numerb = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

        /* Are the lines coincident? */
        if (Math.abs(numera) < Number.EPSILON && Math.abs(numerb) < Number.EPSILON && Math.abs(denom) < Number.EPSILON) {
            x = (x1 + x2) / 2;
            y = (y1 + y2) / 2;
            return true;
        }

        /* Are the lines parallel */
        if (Math.abs(denom) < Number.EPSILON) {
            return false;
        }

        /* Is the intersection along the the segments */
        const mua = numera / denom;
        const mub = numerb / denom;

        if (mua < 0 || mua > 1 || mub < 0 || mub > 1) {
            return false;
        }

        x = x1 + mua * (x2 - x1);
        y = y1 + mua * (y2 - y1);

        return new Point2D(x, y);
    }


    return Object.freeze({
        '0': p1,
        '1': p2,
        start,
        end,
        asArray,
        length,
        midpoint,
        slope,
        pointAtX,
        pointAtY,
        pointAtMagnitude,
        nearestPoint,
        parallelLine,
        perpendicularLine,
        intersection,
        perspectiveTransform
    });
}

Line2D.fromArray = function(arr) {
    return new Line2D(Point2D.fromArray(arr[0]), Point2D.fromArray(arr[1]));
};

module.exports = Object.freeze(Line2D);