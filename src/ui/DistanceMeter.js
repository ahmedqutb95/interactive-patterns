import Theme from "./Theme.js";

export default class DistanceMeter {

    constructor(p) {
        this.p = p;
        this.displayDistance = 0;
    }

   draw(x1, y1, x2, y2) {

    const p = this.p;

    const pinch = this.signal;
/*
   const targetDistance = p.dist(x1, y1, x2, y2);

    this.displayDistance = p.lerp(
        this.displayDistance,
        targetDistance,
        0.4
    );

    const distance = Math.round(
        this.displayDistance
    );
*/
    const mx = (x1 + x2) * 0.5;
    const my = (y1 + y2) * 0.5;

    const pillWidth = 64;
    const pillHeight = 32;
    const radius = 16;

    // Pill background
    p.noStroke();
    p.fill(0, 180);
    p.rectMode(p.CENTER);
    p.rect(
        mx,
        my,
        pillWidth,
        pillHeight,
        radius
    );

    // Border
    p.noFill();
    p.stroke(Theme.colors.primary);
    p.strokeWeight(Theme.stroke.normal);
    p.rect(
        mx,
        my,
        pillWidth,
        pillHeight,
        radius
    );

    // Text
    p.noStroke();
    p.fill(Theme.colors.primary);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(18);

    p.text(
        pinch.toFixed(2),
        //distance,
        mx,
        my + 1
    );

}

}