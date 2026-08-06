import Effect from "./Effect.js";

export default class Pixelate extends Effect {

    constructor(p) {

        super(p);

        this.resolution = 80;
        this.targetResolution = 80;

        this.buffer = p.createGraphics(
            this.resolution,
            Math.round(
                this.resolution *
                p.height /
                p.width
            )
        );

        this.buffer.noSmooth();

    }

    apply(source) {

        // Recreate buffer if resolution changed
        if (this.buffer.width !== this.resolution) {

            this.buffer = this.p.createGraphics(
                this.resolution,
                Math.round(
                    this.resolution *
                    this.p.height /
                    this.p.width
                )
            );

            this.buffer.noSmooth();

        }

        this.buffer.clear();

        this.buffer.image(
            source,
            0,
            0,
            this.buffer.width,
            this.buffer.height
        );

        return this.buffer;

    }

    update(state) {
        this.resolution = state.effects.pixelate.resolution;
    }

}
