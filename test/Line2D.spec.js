const expect = require('chai').expect;

const Line2D = require('../src/Line2D');
const Point2D = require('../src/Point2D');

describe('Line2D', function() {

    it('should describe a line in 2D space', function() {

        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);

        // When
        const aLine = new Line2D(p1, p2);

        // Then
        expect(aLine.start().x).to.equal(p1.x);
        expect(aLine.start().y).to.equal(p1.y);
        expect(aLine.end().x).to.equal(p2.x);
        expect(aLine.end().y).to.equal(p2.y);

    });

    it('should be able to get its start', function() {

        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const aLine = new Line2D(p1, p2);

        // When
        const start = aLine.start();

        // Then
        expect(start.x).to.equal(p1.x);
        expect(start.y).to.equal(p1.y);
    });

    it('should be able to get its end', function() {

        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const aLine = new Line2D(p1, p2);

        // When
        const end = aLine.end();

        // Then
        expect(end.x).to.equal(p2.x);
        expect(end.y).to.equal(p2.y);
    });

    it('should know its length', function() {

        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const aLine = new Line2D(p1, p2);

        // When
        const d = aLine.length();

        // Then
        expect(d).to.equal(2.8284271247461903);

    });

    it('should know its midpoint', function() {
        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const aLine = new Line2D(p1, p2);

        // When
        const mid = aLine.midpoint();

        // Then
        expect(mid.x).to.equal(13);
        expect(mid.y).to.equal(15);

    });

    it('should know its slope', function() {
        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const aLine = new Line2D(p1, p2);

        // When
        const slope = aLine.slope();

        // Then
        expect(slope).to.equal(1);
    });

    it('should be able to solve for y', function() {
        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const aLine = new Line2D(p1, p2);

        // When
        const aPoint = aLine.pointAtX(13);

        // Then
        expect(aPoint.y).to.equal(15);
    });


    it('should be able to solve for x', function() {
        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const aLine = new Line2D(p1, p2);

        // When
        const aPoint = aLine.pointAtY(15);

        // Then
        expect(aPoint.x).to.equal(13);
    });

    it('should be able to describe a point at a given magnitude on itself', function() {

        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const aLine = new Line2D(p1, p2);

        // When
        const aPoint = aLine.pointAtMagnitude(1.5);

        // Then
        expect(aPoint.x).to.equal(13.060660171779821);
        expect(aPoint.y).to.equal(15.060660171779821);
    });

    it('should be able to describe a point on itself closest to a given point', function() {
        // Given
        const p1 = new Point2D(12, 14);
        const p2 = new Point2D(14, 16);
        const p3 = new Point2D(13, 14.5);
        const aLine = new Line2D(p1, p2);

        // When
        const aPoint = aLine.nearestPoint(p3);

        // Then
        expect(aPoint.x).to.equal(12.75);
        expect(aPoint.y).to.equal(14.75);
    });

    it('should be able to plot a line parallel to itself at a given offset', function() {
        // Given
        const p1 = new Point2D(10, 10);
        const p2 = new Point2D(20, 10);
        const aLine = new Line2D(p1, p2);
        const offset = 10;

        // When
        const pLine = aLine.parallelLine(offset);

        // Then
        expect(Math.round(pLine.length() * 10000000000) / 10000000000).to.equal(Math.round(aLine.length() * 10000000000) / 10000000000);
        expect(pLine.start().x).to.equal(10);
        expect(pLine.start().y).to.equal(0);
        expect(pLine.end().x).to.equal(20);
        expect(pLine.end().y).to.equal(0);
    });

    it('should be able to plot a line perpendicular to itself', function() {
        // Given
        const p1 = new Point2D(10, 10);
        const p2 = new Point2D(20, 10);
        const aLine = new Line2D(p1, p2);

        // When
        const pLine = aLine.perpendicularLine();

        // Then
        expect(pLine.length()).to.equal(aLine.length());
        expect(pLine.start().x).to.equal(15);
        expect(pLine.start().y).to.equal(5);
        expect(pLine.end().x).to.equal(15);
        expect(pLine.end().y).to.equal(15);

    });

    it('should be able to tell if another line intersects it', function() {
        // Given
        const p1 = new Point2D(10, 10);
        const p2 = new Point2D(20, 10);
        const aLine = new Line2D(p1, p2);

        const p3 = new Point2D(15, 5);
        const p4 = new Point2D(15, 15);
        const pLine = new Line2D(p3, p4);

        // When
        const intersection = aLine.intersection(pLine);

        // Then
        expect(intersection.x).to.equal(15);
        expect(intersection.y).to.equal(10);

    });

});