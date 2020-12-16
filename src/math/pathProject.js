const normaliseAngle = require('./normaliseAngle.js');

function pathProject(pose, linearVelocity, angularVelocity, duration, hz) {

    const currentPose = pose;

    const points = [];

    /* eslint-disable no-plusplus */
    for (let i = 0; i < duration * hz; i++) {
        /* eslint-enable no-plusplus */

        const dt = (1.0 / hz) * i; // time delta

        const theta = normaliseAngle(currentPose.theta + (angularVelocity * dt));

        const d = linearVelocity * dt;

        points.push({
            x: currentPose.x + (d * Math.cos(theta)),
            y: currentPose.y + (d * Math.sin(theta)),
            theta
        });
    }
    return points;
}


module.exports = pathProject;