/* const $ = require('jquery');*/
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

    it('should rotate (3d z-axis) itself by a given theta in radians from its origin (centroid)', function() {

        // Given - a diamond
        const point0 = new Point2D(75, 50);
        const point1 = new Point2D(100, 75);
        const point2 = new Point2D(75, 100);
        const point3 = new Point2D(50, 75);
        const aPolygon = new Polygon2D([point0, point1, point2, point3]);

        // When
        const points = aPolygon.rotate(math.degreesToRadians(270)).asPoints();

        // Then
        expect(points[0].equals(new Point2D(50, 75))).to.equal(true);
        expect(points[1].equals(new Point2D(75, 50))).to.equal(true);
        expect(points[2].equals(new Point2D(100, 75))).to.equal(true);
        expect(points[3].equals(new Point2D(75, 100))).to.equal(true);

        /* const CONTAINER_HTML = '<div id="#container"></div>';
        const CANVAS_HTML = '<canvas id="canvas" width="400" height="400"></canvas>';
        const $container = $(CONTAINER_HTML);
        $('body').append($container);
        $container.css({
            'width': '100%'
        });
        $container.append(CANVAS_HTML);

        const canvas = document.getElementById('canvas');

        const ctx = canvas.getContext('2d');


        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.lineTo(points[3].x, points[3].y);
        ctx.fill();*/

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

});