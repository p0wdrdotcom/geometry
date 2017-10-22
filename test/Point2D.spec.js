const expect = require('chai').expect;

const Point2D = require('../src/Point2D');

describe('Point2D', function() {

    it('should describe a point in 2d space', function() {
        // Given 
        const x = 12;
        const y = 15;

        // When
        const aPoint = new Point2D(x, y);

        // Then
        expect(aPoint.x).to.equal(x);
        expect(aPoint.y).to.equal(y);
    });

    it('should support bracket index notation for its points', function() {

        // Given 
        const x = 12;
        const y = 15;

        // When
        const aPoint = new Point2D(x, y);

        // Then
        expect(aPoint[0]).to.equal(x);
        expect(aPoint[1]).to.equal(y);

    });

    it('should initialise it coordinates to zero when they are not given', function() {
        // Given 
        const x = 12;
        const y = 15;

        // When
        const aPoint = new Point2D();
        const bPoint = new Point2D(x);
        const cPoint = new Point2D(null, y);

        // Then
        expect(aPoint.x).to.equal(0);
        expect(aPoint.y).to.equal(0);

        expect(bPoint.x).to.equal(x);
        expect(bPoint.y).to.equal(0);

        expect(cPoint.x).to.equal(0);
        expect(cPoint.y).to.equal(y);
    });

    it('should be able to return its coordinates as an array', function() {

        // Given
        const x = 34;
        const y = 54;
        const aPoint = new Point2D(x, y);

        // When
        const pointArr = aPoint.asArray();

        // Then
        expect(Array.isArray(pointArr)).to.equal(true);
        expect(pointArr[0]).to.equal(x);
        expect(pointArr[1]).to.equal(y);
        expect(pointArr.length).to.equal(2);
    });

    it('should return the distance to another Point2D', function() {
        // Given
        const aPoint = new Point2D(45, 53);
        const bPoint = new Point2D(43, 65);

        // When
        const d = aPoint.distance(bPoint);

        // Then
        expect(d).to.equal(12.165525060596439);
    });

    it('should transform itself given a matrix', function() {
        // Given
        const mat = [1, 0, 1, 0, 1, 1, -0, 0, 1];
        const aPoint = new Point2D(34, 57);

        // When
        const tPoint = aPoint.transform(mat);

        // Then 
        expect(tPoint.x).to.equal(35);
        expect(tPoint.y).to.equal(58);

    });

    describe('fromArray', function() {

        it('should construct a point from an array', function() {
            // Given
            const x = 34;
            const y = 23;
            const arr = [x, y];

            // When
            const aPoint = Point2D.fromArray(arr);

            // Then
            expect(aPoint.x).to.equal(x);
            expect(aPoint.y).to.equal(y);
        });

    });

});