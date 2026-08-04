import {
    FilesetResolver,
    HandLandmarker
} from "@mediapipe/tasks-vision";

export default class HandTracker {

    constructor(video) {

        this.video = video;
        this.handLandmarker = null;

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
                minHandDetectionConfidence: 0.8,
                minHandPresenceConfidence: 0.8,
                minTrackingConfidence: 0.8
            }
        );

        console.log("MediaPipe Ready");

    }

    update() {

        if (!this.handLandmarker) return;

        const results = this.handLandmarker.detectForVideo(
            this.video,
            performance.now()
        );

        return results;

    }

}