export default class Renderer {

    constructor(p) {
        this.p = p;
    }

    render() {
        this.p.background(15);

        this.p.fill(255);
        this.p.noStroke();

        this.p.circle(
            this.p.mouseX,
            this.p.mouseY,
            50
        );
    }

}