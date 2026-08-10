import { getCoverRect } from "../utils/Helpers.js";

/** Renders the camera/effect portion of the installation scene. */
export default class Scene {

    constructor(p, effects) {
        this.p = p;
        this.effects = effects;
        this.cameraBuffer = p.createGraphics(p.width, p.height);
        this.sceneBuffer = p.createGraphics(p.width, p.height);
        this.cameraBuffer.pixelDensity(1);
        this.sceneBuffer.pixelDensity(1);
    }

    draw(video, state, mirror) {
        if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            this.p.background(0);
            return;
        }

        this.drawCamera(video);
        this.sceneBuffer.clear();
        this.sceneBuffer.image(this.effects.applyCamera(this.cameraBuffer), 0, 0,
            this.sceneBuffer.width, this.sceneBuffer.height);

        this.p.background(0);
        this.p.push();

        if (mirror) {
            this.p.translate(this.p.width, 0);
            this.p.scale(-1, 1);
        }

        this.p.image(this.sceneBuffer, 0, 0);
        this.p.pop();
    }

    resize() {
        this.cameraBuffer.resizeCanvas(this.p.width, this.p.height);
        this.sceneBuffer.resizeCanvas(this.p.width, this.p.height);
    }

    drawCamera(video) {
        const g = this.cameraBuffer;
        const { sx, sy, sWidth, sHeight } = getCoverRect(
            video.videoWidth, video.videoHeight, g.width, g.height
        );

        g.clear();
        g.drawingContext.drawImage(
            video,
            sx, sy, sWidth, sHeight,
            0, 0, g.width, g.height
        );
    }
}
