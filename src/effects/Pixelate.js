export default class Pixelate {

    constructor(p, size = 12) {
        this.p = p;
        this.size = size;
    }

    draw(video) {

        const p = this.p;

        p.noSmooth();

        p.image(
            video,
            0,
            0,
            Math.ceil(p.width / this.size),
            Math.ceil(p.height / this.size)
        );

        p.image(
            p.get(),
            0,
            0,
            p.width,
            p.height
        );

    }

}