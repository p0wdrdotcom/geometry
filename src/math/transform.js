function generateXAxisRotationMatrix(radians) {
    return [
        1, 0, 0,
        0, Math.cos(radians), -Math.sin(radians),
        0, Math.sin(radians), Math.cos(radians)
    ];
}

function generateZAxisRotationMatrix(radians) {
    return [
        Math.cos(radians), -Math.sin(radians), 0,
        Math.sin(radians), Math.cos(radians), 0,
        0, 0, 1
    ];
}

function generateYAxisRotationMatrix(radians) {
    return [
        Math.cos(radians), 0, Math.sin(radians),
        0, 1, 0,
        -Math.sin(radians), 0, Math.cos(radians)
    ];
}

/* 2d transform on a 3 x 3 matrix */ 
// FIXME: last item in the matrix (mat[8]) is ignored for now as I cannot workout why its breaking.
function T(mat, x, y) {
    const tX = (mat[0] * x + mat[1] * y + mat[2]) / (mat[6] * x + mat[7] * y + 1);
    const tY = (mat[3] * x + mat[4] * y + mat[5]) / (mat[6] * x + mat[7] * y + 1);
    return {
        x: tX,
        y: tY
    };
}

module.exports = {
    generateXAxisRotationMatrix,
    generateYAxisRotationMatrix,
    generateZAxisRotationMatrix,
    T
};