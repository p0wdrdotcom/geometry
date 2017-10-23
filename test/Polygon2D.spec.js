const expect = require('chai').expect;

const Point2D = require('../src/Point2D');
const Polygon2D = require('../src/Polygon2D');

describe('Polygon2D', function() {

    it('should be able to deduplicate its points', function() {

        // Given
        const point0 = new Point2D(1, 3);
        const point1 = new Point2D(2, 3);
        const point2 = new Point2D(3, 4);
        const point3 = new Point2D(4, 5);
        const point4 = new Point2D(6, 6);
        const point5 = new Point2D(6, 6);
        const point6 = new Point2D(2, 6);
        const point7 = new Point2D(2, 3);
        const point8 = new Point2D(6, 7);
        const point9 = new Point2D(6, 7);

        const aPolgon = new Polygon2D([
            point0,
            point1,
            point2,
            point3,
            point4,
            point5,
            point6,
            point7,
            point8,
            point9
        ]);

        // When
        const newPoly = aPolgon.dedup();

        // Then
        expect(newPoly.asPoints().length).to.equal(7);

    });

});