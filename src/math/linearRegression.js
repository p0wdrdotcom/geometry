
/* given an arbitrary set of points return a line that depicts the linear regression. */
function linearRegression(points2D) {

    let x = 0;
    let y = 0;
    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_xx = 0;

    if (points2D == null || points2D.length === 0) {
        return null;
    }

    const count = points2D.length;

    /* eslint-disable no-plusplus */
    for (let i = 0; i < count; i++) {
    	/* eslint-enable no-plusplus */
        x = points2D[i][0];
        y = points2D[i][1];
        sum_x += x;
        sum_y += y;
        sum_xx += x * x;
        sum_xy += x * y;
    }

    /*
     * Calculate m and b:
     * y = x * m + b
     */
    const m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
    const b = (sum_y / count) - (m * sum_x) / count;

    const result = [];
    /* eslint-disable no-plusplus */
    for (let i = 0; i < count; i++) {
    	/* eslint-enable no-plusplus */
        x = points2D[i][0];
        y = x * m + b;

        result.push([x, y]);
    }

    return result;

}


module.exports = linearRegression;