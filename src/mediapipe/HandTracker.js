import {
    FilesetResolver,
    HandLandmarker
} from "@mediapipe/tasks-vision";

export default class HandTracker {

    constructor(video) {

        this.video = video;
        this.handLandmarker = null;
        this.lastDetectionTime = 0;
        this.targetFPS = 30;    

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
                minHandDetectionConfidence: 0.6,
                minHandPresenceConfidence: 0.5,
                minTrackingConfidence: 0.7
            }
        );

        console.log("MediaPipe Ready");

    }

   update() {

        if (!this.handLandmarker) return;

        const now = performance.now();

        if (now - this.lastDetectionTime < (1000 / this.targetFPS)) {
            return this.lastResults;
        }

        this.lastDetectionTime = now;

        this.lastResults = this.handLandmarker.detectForVideo(
            this.video,
            now
        );

        return this.lastResults;

    }

}