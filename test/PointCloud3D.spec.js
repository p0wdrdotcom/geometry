const expect = require('chai').expect;

const Point3D = require('../src/Point3D');

const PointCloud3D = require('../src/PointCloud3D');

describe('PointCloud3D', function() {

    it('should know how many points are in the cloud', function() {

        // Given
        const aPoint = new Point3D(1, 2, 3);
        const anotherPoint = new Point3D(2, 3, 4);

        const aCloud = new PointCloud3D();

        // When
        aCloud.addPoint(aPoint);
        aCloud.addPoint(anotherPoint);

        const cloudSize = aCloud.size();

        // Then
        expect(cloudSize).to.equal(2);

    });

    it('should be able to calculate the centroid of the points of the cloud', function() {

    });

    describe('fromArray', function() {

        it('should contruct a point cloud from an array of Point3D', function() {

            // Given
            const anArrayOfPoints = [
                new Point3D(1, 2, 3),
                new Point3D(2, 3, 4)
            ];

            // When
            const aPointCloud = PointCloud3D.fromArray(anArrayOfPoints);

            // Then
            expect(aPointCloud.size()).to.equal(2);

        });

    });

});