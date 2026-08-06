import Theme from "../config/Theme.js";

export default class Line {

    constructor(p) {
        this.p = p;
        this.g = p;
    }

    draw(from, to) {

        const g = this.g;

        g.stroke(Theme.colors.primary);
        g.strokeWeight(Theme.stroke.normal);
        g.noFill();

        g.line(
            from.x,
            from.y,
            to.x,
            to.y
        );

    }

}
