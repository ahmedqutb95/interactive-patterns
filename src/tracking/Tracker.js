import HandLandmarkerTracker from "./HandTracker.js";

/** Owns MediaPipe and publishes raw tracking results only. */
export default class Tracker {

    constructor(video) {
        this.landmarker = new HandLandmarkerTracker(video);
        this.results = undefined;
        this.hasNewResults = false;
    }

    async init() {
        await this.landmarker.init();
    }

    update() {
        this.results = this.landmarker.update();
        this.hasNewResults = this.landmarker.didUpdate;
    }
}
