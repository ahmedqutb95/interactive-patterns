/** Draws three compact text lines beside the rotation circle. */
export default class TextInfo {

    constructor(p) {
        this.p = p;
    }

    draw(hand) {
        const g = this.p;
        const { center, rotationRadius } = hand;
        const isLeftHand = center.x < g.width / 2;
        const lines = [
            `A: ${hand.rotationLabel}`,
            `D: ${Math.round(hand.distance)}`,
            `V: ${Math.round(hand.velocity)}`
        ];

        g.push();
        g.noStroke();
        g.fill(255, 180);
        g.textSize(14);
        g.textAlign(isLeftHand ? g.RIGHT : g.LEFT, g.CENTER);

        const x = isLeftHand
            ? center.x - rotationRadius - 18
            : center.x + rotationRadius + 18;
        const startY = center.y - 18;

        lines.forEach((line, index) => {
            g.text(line, x, startY + index * 24);
        });
        g.pop();
    }
}
