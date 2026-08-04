export default class Camera {
    constructor() {
        this.video = document.createElement("video");

        this.video.autoplay = true;
        this.video.playsInline = true;
        this.video.muted = true;
        this.mirror = true;
    }

    async start() {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });

        this.video.srcObject = stream;
        await this.video.play();
    }

    getVideo() {
        return this.video;
    }
}