const expect = require('chai').expect;

const Plotly = require('plotly.js');

const pathProject = require('../src/math/pathProject.js');
const degreesToRadians = require('../src/math/degreesToRadians.js');


describe('PathProject', function() {

    it('should project a path from a linear and angular velocity', function() {

        // Given
        const aFrequency = 10; // Hz
        const aDuration = 10.0; // seconds
        const aLinearVelocity = 5; // m/s
        const aAngularVelocity = degreesToRadians(40); // rad/s
        const currentPose = { // 2D position plus direction
            x: 0,
            y: 0,
            theta: degreesToRadians(90)
        };


        // When
        const lineString = pathProject(currentPose, aLinearVelocity, aAngularVelocity, aDuration, aFrequency);

        // Then
        expect(lineString.length).to.equal(aFrequency * aDuration);

        const X = lineString.map(function(point) {
            return point.x;
        });

        const Y = lineString.map(function(point) {
            return point.y;
        });


        const div = document.createElement('div');

        document.body.appendChild(div);

        const trace = {
            type: 'scatter',
            mode: 'lines',
            name: 'Projected Path',
            x: X,
            y: Y,
            line: {
                color: 'red'
            }
        };

        const layout = {
            autoscale: false,
            width: 1000,
            height: 1000,
            xaxis: {
                range: [-50, 50]
            },
            yaxis: {
                scaleanchor: 'x',
                range: [-50, 50]
            }
        };

        const data = [trace];

        Plotly.newPlot(div, data, layout);
    });

});