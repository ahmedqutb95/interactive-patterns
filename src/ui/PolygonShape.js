/** Draws a quad-shaped gradient fill between the two hands' tracked dots. */
export default class PolygonShape {

    constructor(p) {
        this.p = p;
        this.g = p;
    }

    draw(leftHand, rightHand) {
        if (!leftHand?.visible || !rightHand?.visible) return;

        const g = this.g;
        const context = g.drawingContext;
        const points = [
            leftHand.thumb,
            leftHand.index,
            rightHand.index,
            rightHand.thumb
        ];

        const leftCenter = {
            x: (leftHand.thumb.x + leftHand.index.x) * 0.5,
            y: (leftHand.thumb.y + leftHand.index.y) * 0.5
        };
        const rightCenter = {
            x: (rightHand.thumb.x + rightHand.index.x) * 0.5,
            y: (rightHand.thumb.y + rightHand.index.y) * 0.5
        };

        const leftHue = g.map(Math.abs(leftHand.rotation ?? 0), 0, 180, 0, 360);
        const rightHue = g.map(Math.abs(rightHand.rotation ?? 0), 0, 180, 0, 360);
        const leftAlpha = g.constrain(g.map(leftHand.pinch ?? 0, 0, 1, 0.15, 1), 0.15, 0.8);
        const rightAlpha = g.constrain(g.map(rightHand.pinch ?? 0, 0, 1, 0.15, 1), 0.15, 0.8);

        const gradient = context.createLinearGradient(
            leftCenter.x,
            leftCenter.y,
            rightCenter.x,
            rightCenter.y
        );

        gradient.addColorStop(0, `hsla(${leftHue}, 80%, 60%, ${leftAlpha})`);
        gradient.addColorStop(1, `hsla(${rightHue}, 80%, 60%, ${rightAlpha})`);

        context.save();
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
        context.closePath();
        context.fillStyle = gradient;
        context.fill();
        context.restore();
    }
}
