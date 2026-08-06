import Theme from "../config/Theme.js";

export default class DistanceMeter {

    constructor(p) {
        this.p = p;
        this.g = p;
    }

    draw(hand) {

        const g = this.g;
        const p = this.p;


        const pinch = hand.pinch;
        const { x: mx, y: my } = hand.center;

        const pillWidth = 64;
        const pillHeight = 32;
        const radius = 16;

        g.push();

        // Background
        g.rectMode(this.p.CENTER);
        g.noStroke();
        g.fill(0, 180);

        g.rect(
            mx,
            my,
            pillWidth,
            pillHeight,
            radius
        );

        // Border
        g.noFill();
        g.stroke(Theme.colors.primary);
        g.strokeWeight(Theme.stroke.normal);

        g.rect(
            mx,
            my,
            pillWidth,
            pillHeight,
            radius
        );

        // Text

        g.noStroke();
        g.fill(Theme.colors.primary);

        g.textAlign(p.CENTER, p.CENTER);
        g.textSize(18);

        g.text(
            pinch.toFixed(2),
            mx,
            my
        );

        g.pop();

    }

}
