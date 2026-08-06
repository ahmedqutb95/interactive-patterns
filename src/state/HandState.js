const emptyHand = () => ({
    visible: false,
    thumb: null,
    index: null,
    center: null,
    distance: 0,
    pinch: 0,
    angle: 0,
    rotation: 0,
    rotationArcEnd: 0,
    rotationArcCounterClockwise: false,
    rotationRadius: 0,
    rotationLabel: "0°",
    rotationLabelPosition: null,
    velocity: 0
});

/** Computes the hand portion of the shared State snapshot. */
export default class HandState {

    constructor(p, settings) {
        this.p = p;
        this.settings = settings;
        this.smoothedHands = new Map();
        this.previousCenters = new Map();
        this.rotationBaselines = new Map();
        this.rotationResetArmed = new Map();
    }

    update(results, elapsedSeconds, mirrored) {
        const hands = { left: emptyHand(), right: emptyHand() };

        results?.landmarks?.forEach((landmarks, index) => {
            const name = this.getHandName(results, index);
            hands[name] = this.createHand(name, landmarks, elapsedSeconds, mirrored);
        });

        return hands;
    }

    getHandName(results, index) {
        const label = results.handedness?.[index]?.[0]?.categoryName?.toLowerCase();
        return label === "left" ? "left" : "right";
    }

    createHand(name, landmarks, elapsedSeconds, mirrored) {
        const points = this.smooth(name, landmarks);
        const thumb = this.toDisplayPoint(points[4], mirrored);
        const index = this.toDisplayPoint(points[8], mirrored);
        const center = {
            x: (thumb.x + index.x) * 0.5,
            y: (thumb.y + index.y) * 0.5
        };
        const distance = this.p.dist(thumb.x, thumb.y, index.x, index.y);
        const angle = Math.atan2(index.y - thumb.y, index.x - thumb.x);
        const pinch = this.p.map(distance,
            this.settings.pinch.minimumDistance,
            this.settings.pinch.maximumDistance,
            0,
            1,
            true);
        const baseline = this.updateRotationBaseline(name, angle, pinch);
        const rotationAngle = this.rotationResetArmed.get(name) ? baseline : angle;
        const rotationDelta = Math.atan2(
            Math.sin(rotationAngle - baseline),
            Math.cos(rotationAngle - baseline)
        );
        const rotation = this.getDirectionalRotation(name, rotationDelta);
        const rotationRadius = Math.max(
            distance * 0.5 + 20,
            this.settings.rotation.minimumRadius
        );
        const previous = this.previousCenters.get(name);
        const velocity = previous
            ? this.p.dist(center.x, center.y, previous.x, previous.y) / elapsedSeconds
            : 0;

        this.previousCenters.set(name, center);

        return {
            visible: true,
            thumb,
            index,
            center,
            distance,
            pinch,
            angle,
            rotation,
            rotationArcEnd: -this.p.HALF_PI + (
                (name === "left" ? -1 : 1) * rotation * this.p.PI / 180
            ),
            rotationArcCounterClockwise: name === "left",
            rotationRadius,
            rotationLabel: `${Math.round(rotation)}°`,
            rotationLabelPosition: {
                x: center.x,
                y: center.y + rotationRadius + 18
            },
            velocity
        };
    }

    smooth(name, landmarks) {
        if (!this.smoothedHands.has(name)) {
            this.smoothedHands.set(name, landmarks.map(({ x, y }) => ({ x, y })));
        }

        const smoothed = this.smoothedHands.get(name);
        landmarks.forEach((point, index) => {
            const amount = this.getSmoothingAmount(smoothed[index], point);

            smoothed[index].x = this.p.lerp(smoothed[index].x, point.x, amount);
            smoothed[index].y = this.p.lerp(smoothed[index].y, point.y, amount);
        });

        return smoothed;
    }

    getSmoothingAmount(smoothed, point) {
        const delta = Math.hypot(point.x - smoothed.x, point.y - smoothed.y);
        const settings = this.settings.smoothing;

        return this.p.map(
            delta,
            0,
            settings.maximumDelta,
            settings.stationary,
            settings.moving,
            true
        );
    }

    updateRotationBaseline(name, angle, pinch) {
        if (!this.rotationBaselines.has(name)) {
            this.rotationBaselines.set(name, angle);
        }

        if (pinch <= this.settings.rotation.closedPinch) {
            this.rotationResetArmed.set(name, true);
        }

        if (
            this.rotationResetArmed.get(name) &&
            pinch >= this.settings.rotation.openPinch
        ) {
            this.rotationBaselines.set(name, angle);
            this.rotationResetArmed.set(name, false);
        }

        return this.rotationBaselines.get(name);
    }

    getDirectionalRotation(name, delta) {
        const degrees = this.p.degrees(delta);

        return name === "left"
            ? Math.max(0, -degrees)
            : Math.max(0, degrees);
    }

    toDisplayPoint(point, mirrored) {
        return {
            x: mirrored
                ? this.p.width - point.x * this.p.width
                : point.x * this.p.width,
            y: point.y * this.p.height
        };
    }
}
