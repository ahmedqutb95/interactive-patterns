import Theme from "../config/Theme.js";

export default class Dot {

    constructor(p) {
        this.p = p;
        this.g = p;
        this.scale = 1;
    }

    draw(point) {

        const g = this.g;
        const { x, y } = point;

        this.drawRotatingRing(g, x, y);

        // Outer circle
        g.fill(0, 0, 0, 70);
        g.stroke(Theme.colors.primary);
        g.strokeWeight(Theme.stroke.normal);
        g.circle(
            x,
            y,
            Theme.radius.dot * this.scale * 14
        );

        // Inner translucent fill
        g.noStroke();
        g.fill(255, 255, 255, );
        g.circle(
            x,
            y,
            Theme.radius.dot * this.scale * 2
        );

        // Center dot
        g.fill(Theme.colors.primary);
        g.circle(
            x,
            y,
            Theme.radius.dot * this.scale * 0.22
        );

    }

    drawRotatingRing(g, x, y) {
        const tickCount = 32;
        const radius = Theme.radius.dot * this.scale * 9;

        g.push();
        g.translate(x, y);
        g.rotate(this.p.frameCount / 50);
        g.rectMode(this.p.CENTER);
        g.noStroke();
        g.fill(Theme.colors.primary);

        for (let tick = 0; tick < tickCount; tick += 1) {
            const angle = (this.p.TWO_PI / tickCount) * tick;

            g.push();
            g.rotate(angle);
            g.circle(0, -radius, 3);
            g.pop();
        }

        g.pop();
    }

}
