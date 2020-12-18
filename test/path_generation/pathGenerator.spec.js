const expect = require('chai').expect;

const Plotly = require('plotly.js');

const generatePath = require('../../src/math/generatePath.js');

describe('pathGenerator', function() {

    it('should generate a path with limitations', function() {

        // Given
        const aNumberOfSteps = 15;
        const anOrigin = {
            x: 0,
            y: 0
        };

        // When
        const aPath = generatePath(anOrigin, aNumberOfSteps);

        // Then
        expect(aPath.length).to.equal(aNumberOfSteps);

        // Visualise

        const X = aPath.map(function(point) {
            return point.x;
        });

        const Y = aPath.map(function(point) {
            return point.y;
        });

        const pathTrace = {
            x: X,
            y: Y,
            type: 'scatter'
        };
        const data = [pathTrace];
        const layout = {
            showlegend: false,
            xaxis: {
                range: [-150, 150]
            },
            yaxis: {
                scaleanchor: 'x'
            }
        };

        document.body.insertAdjacentHTML('beforeend', '<div id="visualisePlot"></div>');
        Plotly.newPlot('visualisePlot', data, layout);

    });

});