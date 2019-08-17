// const svg = require('svgjs');
// const $ = require('jquery');
const expect = require('chai').expect;

const Point2D = require('../src/Point2D');
const Polygon2D = require('../src/Polygon2D');

const math = require('../src/math');

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


    it('should rotate (3d x-axis) itself by a given theta in radians from its origin (centroid)', function() {

        // Given - a diamond
        const point0 = new Point2D(75, 50);
        const point1 = new Point2D(100, 75);
        const point2 = new Point2D(75, 100);
        const point3 = new Point2D(50, 75);
        const aPolygon = new Polygon2D([point0, point1, point2, point3]);

        // When
        const points = aPolygon.rotateX(math.degreesToRadians(45)).asPoints();

        // Then
        expect(points[0].equals(new Point2D(75, 57.32233047033631))).to.equal(true);
        expect(points[1].equals(new Point2D(100, 75))).to.equal(true);
        expect(points[2].equals(new Point2D(75, 92.67766952966369))).to.equal(true);
        expect(points[3].equals(new Point2D(50, 75))).to.equal(true);

        /* console.log(points.map(function(p) {
            return [p.x, p.y];
        }));

        const CONTAINER_HTML = '<div id="#container"></div>';
        const $container = $(CONTAINER_HTML);
        $('body').append($container);
        $container.css({
            'width': '100%'
        });

        const draw = svg($container.get(0));
        draw.style('position: absolute; top: 0; left: 0;');
        draw.size('100%', '100%');

        const ptArr = new svg.PointArray(points.map(function(p) {
            return [p.x, p.y];
        }));
        const shape = draw.polygon(ptArr);


        shape.fill('#000000').stroke({
            width: 2,
            color: '#000000',
            opacity: 1
        });*/

    });

    it('should rotate (3d y-axis) itself by a given theta in radians from its origin (centroid)', function() {

        // Given - a diamond
        const point0 = new Point2D(75, 50);
        const point1 = new Point2D(100, 75);
        const point2 = new Point2D(75, 100);
        const point3 = new Point2D(50, 75);
        const aPolygon = new Polygon2D([point0, point1, point2, point3]);

        // When
        const points = aPolygon.rotateY(math.degreesToRadians(45)).asPoints();

        // Then
        expect(points[0].equals(new Point2D(75, 50))).to.equal(true);
        expect(points[1].equals(new Point2D(92.67766952966369, 75))).to.equal(true);
        expect(points[2].equals(new Point2D(75, 100))).to.equal(true);
        expect(points[3].equals(new Point2D(57.32233047033631, 75))).to.equal(true);

    });

    it('should rotate (3d z-axis) itself by a given theta in radians from its origin (centroid)', function() {

        // Given - a diamond
        const point0 = new Point2D(75, 50);
        const point1 = new Point2D(100, 75);
        const point2 = new Point2D(75, 100);
        const point3 = new Point2D(50, 75);
        const aPolygon = new Polygon2D([point0, point1, point2, point3]);

        // When
        const points = aPolygon.rotate(math.degreesToRadians(90)).asPoints();

        // Then
        expect(points[0].equals(new Point2D(50, 75))).to.equal(true);
        expect(points[1].equals(new Point2D(75, 50))).to.equal(true);
        expect(points[2].equals(new Point2D(100, 75))).to.equal(true);
        expect(points[3].equals(new Point2D(75, 100))).to.equal(true);

    });

    it('should scale itself by a given factor from its origin (centroid)', function() {

        // Given - a diamond
        const point0 = new Point2D(75, 50);
        const point1 = new Point2D(100, 75);
        const point2 = new Point2D(75, 100);
        const point3 = new Point2D(50, 75);
        const aPolygon = new Polygon2D([point0, point1, point2, point3]);

        // When
        const points = aPolygon.scale(2).asPoints();

        // Then
        expect(points[0].equals(new Point2D(75, 25))).to.equal(true);
        expect(points[1].equals(new Point2D(125, 75))).to.equal(true);
        expect(points[2].equals(new Point2D(75, 125))).to.equal(true);
        expect(points[3].equals(new Point2D(25, 75))).to.equal(true);

    });

    it('should tell if a given 2d point is outside the polygon', function() {

        // Given
        const aPointOutside = new Point2D(0, 0);
        const aPolygon = new Polygon2D([
            new Point2D(75, 50),
            new Point2D(100, 75),
            new Point2D(75, 100),
            new Point2D(50, 75)
        ]);

        // When
        const isInside = aPolygon.isPointInside(aPointOutside);

        // Then
        expect(isInside).to.equal(false);
    });

    it('should tell if a given 2d point is inside the polygon', function() {

        // Given
        const aPointInside = new Point2D(75, 75);
        const aPolygon = new Polygon2D([
            new Point2D(75, 50),
            new Point2D(100, 75),
            new Point2D(75, 100),
            new Point2D(50, 75)
        ]);

        // When
        const isInside = aPolygon.isPointInside(aPointInside);

        // Then
        expect(isInside).to.equal(true);
    });

});