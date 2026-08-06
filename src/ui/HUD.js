import Dot from "./Dot.js";
import Line from "./Line.js";
import DistanceMeter from "./DistanceMeter.js";
import Rotation from "./Rotation.js";
import TextInfo from "./TextInfo.js";
import PolygonShape from "./PolygonShape.js";

/** Renders hand feedback from the shared State snapshot. */
export default class HUD {

    constructor(p) {
        this.p = p;
        this.dot = new Dot(p);
        this.line = new Line(p);
        this.distanceMeter = new DistanceMeter(p);
        this.rotation = new Rotation(p);
        this.textInfo = new TextInfo(p);
        this.polygonShape = new PolygonShape(p);
    }

    draw(state) {
        const leftHand = state.hand.left;
        const rightHand = state.hand.right;

        this.drawHand(leftHand);
        this.drawHand(rightHand);
        this.polygonShape.draw(leftHand, rightHand);
    }

    drawHand(hand) {
        if (!hand.visible) return;
        this.rotation.draw(hand);
        this.textInfo.draw(hand);
        this.line.draw(hand.thumb, hand.index);
        this.dot.draw(hand.thumb);
        this.dot.draw(hand.index);
        this.distanceMeter.draw(hand);
    }
}
