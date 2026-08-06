/** Draws a hand-rotation indicator from values prepared by State. */
export default class Rotation {

    constructor(p) {
        this.p = p;
        this.g = p;
    }

    draw(hand) {
        const g = this.g;
        const {
            center,
            rotationRadius,
            rotationArcEnd,
            rotationArcCounterClockwise,
            rotationLabel,
            rotationLabelPosition
        } = hand;
        const diameter = rotationRadius * 2;

        g.push();
        g.noFill();
        g.stroke(255, 128);
        g.strokeWeight(1);
        g.circle(center.x, center.y, diameter);
        g.pop();

        this.drawArc(center, rotationRadius, rotationArcEnd, rotationArcCounterClockwise);

        g.push();
        g.noStroke();
        g.fill(255, 128);
        g.textAlign(this.p.CENTER, this.p.CENTER);
        g.textSize(24);
        const labelY = rotationLabelPosition.y + 8;
        g.text(rotationLabel, rotationLabelPosition.x, labelY);
        g.pop();
    }

    drawArc(center, radius, endAngle, counterClockwise) {
        const context = this.g.drawingContext;
        const startAngle = -this.p.HALF_PI;
        const gradient = context.createRadialGradient(
            center.x,
            center.y,
            0,
            center.x,
            center.y,
            radius
        );

        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.02)");
        gradient.addColorStop(0.65, "rgba(255, 255, 255, 0.08)");
        gradient.addColorStop(0.85, "rgba(255, 255, 255, 0.22)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.4)");

        context.save();
        context.beginPath();
        context.moveTo(center.x, center.y);
        context.arc(center.x, center.y, radius, startAngle, endAngle, counterClockwise);
        context.closePath();
        context.fillStyle = gradient;
        context.fill();
        context.restore();
    }
}
