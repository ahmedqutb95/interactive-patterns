import {
    FilesetResolver,
    HandLandmarker
} from "@mediapipe/tasks-vision";
import { HandSignals } from "../config/Settings.js";

export default class HandTracker {

    constructor(video) {

        this.video = video;
        this.handLandmarker = null;
        this.lastVideoTime = -1;
        this.didUpdate = false;

        console.log("HandTracker created");

    }

    async init() {

        console.log("Loading MediaPipe...");

        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        this.handLandmarker = await HandLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task"
                },
                runningMode: "VIDEO",
                numHands: 2,
                minHandDetectionConfidence: HandSignals.tracking.detectionConfidence,
                minHandPresenceConfidence: HandSignals.tracking.presenceConfidence,
                minTrackingConfidence: HandSignals.tracking.trackingConfidence
            }
        );

        console.log("MediaPipe Ready");

    }

   update() {

        this.didUpdate = false;

        if (!this.handLandmarker) return;

        if (this.video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
            return this.lastResults;
        }

        if (this.video.currentTime === this.lastVideoTime) {
            return this.lastResults;
        }

        const now = performance.now();
        this.lastVideoTime = this.video.currentTime;
        this.didUpdate = true;

        this.lastResults = this.handLandmarker.detectForVideo(
            this.video,
            now
        );

        return this.lastResults;

    }

}
