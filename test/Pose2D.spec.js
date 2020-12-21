const expect = require('chai').expect;

const Pose2D = require('../src/Pose2D.js');
const Point2D = require('../src/Point2D.js');

describe('Pose2D', function() {

    it('should descibe a pose in 2D space', function() {

        // Given
        const x = 3.3;
        const y = 4.4;
        const theta = 0.5;

        // When
        const aPose = new Pose2D(x, y, theta);

        // Then
        expect(aPose.x).to.equal(x);
        expect(aPose.y).to.equal(y);
        expect(aPose.theta).to.equal(theta);
        expect(aPose.angle()).to.equal(theta);

    });

    it('should know its type', function() {

        // Given
        const x = 3.3;
        const y = 4.4;
        const theta = 0.5;

        // When
        const aPose = new Pose2D(x, y, theta);

        // Then
        expect(Pose2D.TYPE).to.equal(aPose.TYPE);
        expect(aPose.TYPE).to.equal('Pose2D');
        expect(Pose2D.TYPE).to.equal('Pose2D');

    });

    it('should support bracket index notation for its points and direction', function() {

        // Given
        const x = 3.3;
        const y = 4.4;
        const theta = 0.5;

        // When
        const aPose = new Pose2D(x, y, theta);

        // Then
        expect(aPose[0]).to.equal(x);
        expect(aPose[1]).to.equal(y);
        expect(aPose[2]).to.equal(theta);

    });


    it('should initialise its points and angle to zero when they are not given', function() {

        // Given
        const x = 12;
        const y = 15;
        const theta = 0.5;

        // When
        const aPose = new Pose2D();
        const bPose = new Pose2D(x);
        const cPose = new Pose2D(null, y);
        const dPose = new Pose2D(null, null, theta);

        // Then
        expect(aPose.x).to.equal(0);
        expect(aPose.y).to.equal(0);
        expect(aPose.theta).to.equal(0);

        expect(bPose.x).to.equal(x);
        expect(bPose.y).to.equal(0);
        expect(aPose.theta).to.equal(0);

        expect(cPose.x).to.equal(0);
        expect(cPose.y).to.equal(y);
        expect(cPose.theta).to.equal(0);

        expect(dPose.x).to.equal(0);
        expect(dPose.y).to.equal(0);
        expect(dPose.theta).to.equal(theta);

    });

    it('should be able to return its coordinates and direction as an array', function() {

        // Given
        const x = 12;
        const y = 15;
        const theta = 0.5;
        const aPose = new Pose2D(x, y, theta);

        // When
        const anArray = aPose.asArray();

        // Then
        expect(Array.isArray(anArray)).to.equal(true);
        expect(anArray[0]).to.equal(x);
        expect(anArray[1]).to.equal(y);
        expect(anArray[2]).to.equal(theta);
        expect(anArray.length).to.equal(3);

    });

    it('should be able to return a Point2D of its coordinate', function() {

        // Given
        const x = 12;
        const y = 15;
        const theta = 0.5;
        const aPose = new Pose2D(x, y, theta);

        // When
        const aPoint = aPose.asPoint();

        // Then
        expect(aPoint.TYPE).to.equal(Point2D.TYPE);
        expect(aPoint.x).to.equal(x);
        expect(aPoint.y).to.equal(y);

    });

    it('should be able to move a pose some distance in the pose direction', function() {

        // Given
        const x = 12;
        const y = 15;
        const theta = 0.5;
        const aPose = new Pose2D(x, y, theta);

        const someDistance = 23.4;

        // When
        const newPose = aPose.move(someDistance);

        // Then
        expect(newPose.x).to.equal(32.53543194823472);
        expect(newPose.y).to.equal(26.21855760333835);

    });



    describe('fromArray', function() {

        it('should create a pose from an array', function() {

            // Given
            const anArray = [1, 2, 3];

            // When
            const aPose = Pose2D.fromArray(anArray);

            // Then
            expect(aPose).to.not.equal(null);
            expect(aPose.TYPE).to.equal(Pose2D.TYPE);
            expect(aPose.x).to.equal(anArray[0]);
            expect(aPose.y).to.equal(anArray[1]);
            expect(aPose.theta).to.equal(anArray[2]);

        });

        it('should politely not create a pose from anything that is not an array', function() {

            // Given
            const notAnArray = {};
            const stillNotAnArray = 1234;

            // when
            const onePose = Pose2D.fromArray(notAnArray);
            const anotherPose = Pose2D.fromArray(stillNotAnArray);

            // Then
            expect(onePose).to.equal(null);
            expect(anotherPose).to.equal(null);

        });

        it('should only create a pose from an array that is the correct size', function() {

            // Given
            const aSmallArray = [1];
            const aBigArray = [1, 2, 3, 4, 5];
            const oneThatIsJustRight = [1, 2, 3];

            // When
            const mommaBear = Pose2D.fromArray(aSmallArray);
            const daddyBear = Pose2D.fromArray(aBigArray);
            const babybear = Pose2D.fromArray(oneThatIsJustRight);

            // Then
            expect(mommaBear).to.equal(null);
            expect(daddyBear).to.equal(null);
            expect(babybear).to.not.equal(null);

        });

    });


});