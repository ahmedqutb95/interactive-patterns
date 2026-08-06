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

        this.drawCamera(video, state.overlay);
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

    drawCamera(video, overlay) {
        const g = this.cameraBuffer;
        const videoWidth = video.videoWidth || g.width;
        const videoHeight = video.videoHeight || g.height;
        const videoAspect = videoWidth / videoHeight;
        const canvasAspect = g.width / g.height;

        let drawWidth = g.width;
        let drawHeight = g.height;

        if (videoAspect > canvasAspect) {
            drawHeight = g.height;
            drawWidth = drawHeight * videoAspect;
        } else {
            drawWidth = g.width;
            drawHeight = drawWidth / videoAspect;
        }

        g.clear();
        g.drawingContext.drawImage(
            video,
            (g.width - drawWidth) * 0.5,
            (g.height - drawHeight) * 0.5,
            drawWidth,
            drawHeight
        );
        g.colorMode(this.p.HSB, 360, 100, 100, 255);
        g.noStroke();
        g.fill(overlay.hue, 100, 20, overlay.opacity);
        g.rect(0, 0, g.width, g.height);
        g.colorMode(this.p.RGB);
    }
}
