/* 2d transform perspective transform on a 3 x 3 matrix (typically a Homography) */
function perspectiveTransform(mat, x, y) {
    const tX = (mat[0] * x + mat[1] * y + mat[2]) / (mat[6] * x + mat[7] * y + 1);
    const tY = (mat[3] * x + mat[4] * y + mat[5]) / (mat[6] * x + mat[7] * y + 1);
    return {
        x: tX,
        y: tY
    };
}

const IDENTITY_4X4 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];

function generateXAxisRotationMatrix(radians) {
    const m = IDENTITY_4X4.slice();

    m[5] = Math.cos(radians);
    m[6] = -Math.sin(radians);

    m[9] = Math.sin(radians);
    m[10] = Math.cos(radians);

    return m;
}


function generateYAxisRotationMatrix(radians) {
    const m = IDENTITY_4X4.slice();

    m[0] = Math.cos(radians);
    m[2] = Math.sin(radians);

    m[8] = -Math.sin(radians);
    m[10] = Math.cos(radians);

    return m;
}

function generateZAxisRotationMatrix(radians) {
    const m = IDENTITY_4X4.slice();

    m[0] = Math.cos(radians);
    m[1] = -Math.sin(radians);

    m[4] = Math.sin(radians);
    m[5] = Math.cos(radians);

    return m;
}

function generateTranslationMatrix(x, y, z) {
    const m = IDENTITY_4X4.slice();

    m[12] = x;
    m[13] = y;
    m[14] = z;

    return m;
}

function generateScaleMatrix(w, h, d) {
    const m = IDENTITY_4X4.slice();

    m[0] = w;
    m[5] = h;
    m[10] = d;

    return m;
}

/* 3d transformation using a standard 4x4 matrix - ala webgl or opengl etc */
function transform3D(mat, x, y, z) {
    // Ignoring W as its not relavant to me yet - wait for the Point3D and Line3D
    const w = 1;

    // Row 1
    const c0r0 = mat[0];
    const c1r0 = mat[1];
    const c2r0 = mat[2];
    const c3r0 = mat[3];

    // Row 2
    const c0r1 = mat[4];
    const c1r1 = mat[5];
    const c2r1 = mat[6];
    const c3r1 = mat[7];

    // Row 3
    const c0r2 = mat[8];
    const c1r2 = mat[9];
    const c2r2 = mat[10];
    const c3r2 = mat[11];

    // Row 4
    const c0r3 = mat[12];
    const c1r3 = mat[13];
    const c2r3 = mat[14];
    const c3r3 = mat[15];

    const X = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);
    const Y = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);
    const Z = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);
    const W = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);

    return {
        x: X,
        y: Y,
        z: Z,
        w: W
    };
}

module.exports = {
    perspectiveTransform,
    generateXAxisRotationMatrix,
    generateYAxisRotationMatrix,
    generateZAxisRotationMatrix,
    generateTranslationMatrix,
    generateScaleMatrix,
    transform3D,
    IDENTITY_4X4
};