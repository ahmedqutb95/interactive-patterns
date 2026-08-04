import Theme from "./Theme.js";

export default class Line {

    constructor(p) {
        this.p = p;
    }

    draw(x1, y1, x2, y2) {

        const p = this.p;

        p.stroke(Theme.colors.primary);
        p.strokeWeight(Theme.stroke.normal);
        p.noFill();

        p.line(
            x1,
            y1,
            x2,
            y2
        );

    }

}