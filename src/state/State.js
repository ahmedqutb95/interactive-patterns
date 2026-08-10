import { HandSignals } from "../config/Settings.js";
import HandState from "./HandState.js";
import FaceState from "./FaceState.js";
import PoseState from "./PoseState.js";

const freezePoint = (point) => point && Object.freeze({ ...point });

const freezeHand = (hand) => Object.freeze({
    ...hand,
    thumb: freezePoint(hand.thumb),
    index: freezePoint(hand.index),
    center: freezePoint(hand.center),
    rotationLabelPosition: freezePoint(hand.rotationLabelPosition)
});

const freezeFrame = (frame) => Object.freeze({
    hand: Object.freeze({
        left: freezeHand(frame.hand.left),
        right: freezeHand(frame.hand.right)
    }),
    effects: Object.freeze({
        pixelate: Object.freeze({ ...frame.effects.pixelate })
    }),
    face: Object.freeze({ ...frame.face }),
    pose: Object.freeze({ ...frame.pose })
});

/**
 * The single source of truth for computed installation state.
 * It transforms raw tracking results into immutable, render-ready values.
 */
export default class State {

    constructor(p) {
        this.p = p;
        this.handState = new HandState(p, HandSignals);
        this.faceState = new FaceState();
        this.poseState = new PoseState();
        this.lastUpdateTime = performance.now();
        this.snapshot = freezeFrame({
            hand: this.handState.update(),
            effects: { pixelate: { resolution: 80 } },
            face: this.faceState.update(),
            pose: this.poseState.update()
        });
    }

    update(results, mirrored = false, hasNewResults = true, video = null) {
        if (!hasNewResults) return;

        const now = performance.now();
        const elapsedSeconds = Math.max((now - this.lastUpdateTime) / 1000, 0.001);
        this.lastUpdateTime = now;
        const hands = this.handState.update(results, elapsedSeconds, mirrored, video);

        this.snapshot = freezeFrame({
            hand: hands,
            effects: {
                pixelate: {
                    resolution: this.p.round(this.p.map(
                        hands.right.pinch, 0, 1,
                        HandSignals.pixelate.resolution.minimum,
                        HandSignals.pixelate.resolution.maximum,
                        true
                    ))
                }
            },
            face: this.faceState.update(),
            pose: this.poseState.update()
        });
    }

    get hand() {
        return this.snapshot.hand;
    }

    get effects() {
        return this.snapshot.effects;
    }
}
