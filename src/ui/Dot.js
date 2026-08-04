import Theme from "./Theme.js";

export default class Dot {

    constructor(p) {
        this.p = p;
    }

    draw(x, y) {

        const p = this.p;

        // Outer circle
        p.fill(0, 0, 0, 70);
        p.stroke(Theme.colors.primary);
        p.strokeWeight(Theme.stroke.normal);
        p.circle(
            x,
            y,
            Theme.radius.dot * 12
        );

        // Inner translucent fill
        p.noStroke();
        p.fill(255, 255, 255, );
        p.circle(
            x,
            y,
            Theme.radius.dot * 2
        );

        // Center dot
        p.fill(Theme.colors.primary);
        p.circle(
            x,
            y,
            Theme.radius.dot * 0.22
        );

    }

}