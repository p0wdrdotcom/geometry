const matrix = require('./matrix');

function calculateHomography(src, dst) {

    const s = src.reduce(function(a, b) {
        return a.concat(b);
    }, []);

    const d = dst.reduce(function(a, b) {
        return a.concat(b);
    }, []);

    const r1 = [s[0], s[1], 1, 0, 0, 0, -1 * d[0] * s[0], -1 * d[0] * s[1]];
    const r2 = [0, 0, 0, s[0], s[1], 1, -1 * d[1] * s[0], -1 * d[1] * s[1]];
    const r3 = [s[2], s[3], 1, 0, 0, 0, -1 * d[2] * s[2], -1 * d[2] * s[3]];
    const r4 = [0, 0, 0, s[2], s[3], 1, -1 * d[3] * s[2], -1 * d[3] * s[3]];
    const r5 = [s[4], s[5], 1, 0, 0, 0, -1 * d[4] * s[4], -1 * d[4] * s[5]];
    const r6 = [0, 0, 0, s[4], s[5], 1, -1 * d[5] * s[4], -1 * d[5] * s[5]];
    const r7 = [s[6], s[7], 1, 0, 0, 0, -1 * d[6] * s[6], -1 * d[6] * s[7]];
    const r8 = [0, 0, 0, s[6], s[7], 1, -1 * d[7] * s[6], -1 * d[7] * s[7]];

    const matA = [r1, r2, r3, r4, r5, r6, r7, r8];
    const matB = d;
    let matC = null;

    try {
        matC = matrix.inv(matrix.dotMMsmall(matrix.transpose(matA), matA));
    } catch (e) {
        console.error(e);
        return [1, 0, 0, 0, 1, 0, 0, 0];
    }

    const matD = matrix.dotMMsmall(matC, matrix.transpose(matA));
    const matX = matrix.dotMV(matD, matB).map(function(num) {
        return Math.round(num * 10000000000) / 10000000000;
    });

    matX[8] = 1;

    return matX;
}

module.exports = calculateHomography;