const expect = require('chai').expect;

const Point3D = require('../src/Point3D');

describe('Point3D', function() {

    it('should describe a point in 3d space', function() {
        // Given
        const x = 12;
        const y = 15;
        const z = 9;

        // When
        const aPoint = new Point3D(x, y, z);

        // Then
        expect(aPoint.x).to.equal(x);
        expect(aPoint.y).to.equal(y);
        expect(aPoint.z).to.equal(z);
    });

    it('should know its type', function() {
        // Given
        const x = 12;
        const y = 15;
        const z = 9;

        // When
        const aPoint = new Point3D(x, y, z);

        // Then
        expect(aPoint.TYPE).to.equal('Point3D');
    });

    it('should support bracket index notation for its points', function() {

        // Given
        const x = 12;
        const y = 15;
        const z = 9;

        // When
        const aPoint = new Point3D(x, y, z);

        // Then
        expect(aPoint[0]).to.equal(x);
        expect(aPoint[1]).to.equal(y);
        expect(aPoint[2]).to.equal(z);

    });

    it('should initialise it coordinates to zero when they are not given', function() {
        // Given
        const x = 12;
        const y = 15;
        const z = 9;

        // When
        const aPoint = new Point3D();
        const bPoint = new Point3D(x);
        const cPoint = new Point3D(null, y);
        const dPoint = new Point3D(null, null, z);

        // Then
        expect(aPoint.x).to.equal(0);
        expect(aPoint.y).to.equal(0);
        expect(aPoint.z).to.equal(0);

        expect(bPoint.x).to.equal(x);
        expect(bPoint.y).to.equal(0);
        expect(bPoint.z).to.equal(0);

        expect(cPoint.x).to.equal(0);
        expect(cPoint.y).to.equal(y);
        expect(cPoint.z).to.equal(0);

        expect(dPoint.x).to.equal(0);
        expect(dPoint.y).to.equal(0);
        expect(dPoint.z).to.equal(z);
    });

    it('should be able to return its coordinates as an array', function() {

        // Given
        const x = 34;
        const y = 54;
        const z = 44;
        const aPoint = new Point3D(x, y, z);

        // When
        const pointArr = aPoint.asArray();

        // Then
        expect(Array.isArray(pointArr)).to.equal(true);
        expect(pointArr[0]).to.equal(x);
        expect(pointArr[1]).to.equal(y);
        expect(pointArr[2]).to.equal(z);
        expect(pointArr.length).to.equal(3);
    });

    it('should return the distance to another Point3D', function() {
        // Given
        const aPoint = new Point3D(45, 53, 32);
        const bPoint = new Point3D(43, 65, 43);

        // When
        const d = aPoint.distance(bPoint);

        // Then
        expect(d).to.equal(16.401219466856727);
    });

    it('should return a normalised direction vector to another Point3D', function() {
        // Given
        const aPoint = new Point3D(45, 53, 32);
        const bPoint = new Point3D(43, 65, 43);

        // When
        const vector = aPoint.direction(bPoint);

        // Then
        expect(vector.length).to.equal(3);
        expect(vector[0]).to.equal(0.12194215216993846);
        expect(vector[1]).to.equal(-0.7316529130196308);
        expect(vector[2]).to.equal(-0.6706818369346615);

    });


    describe('fromArray', function() {

        it('should construct a point from an array', function() {
            // Given
            const x = 34;
            const y = 23;
            const z = 41;
            const arr = [x, y, z];

            // When
            const aPoint = Point3D.fromArray(arr);

            // Then
            expect(aPoint.x).to.equal(x);
            expect(aPoint.y).to.equal(y);
            expect(aPoint.z).to.equal(z);
        });

    });

});