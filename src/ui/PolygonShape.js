/** Draws a quad between the two hands' tracked dots, filled with a pixelated
 *  sample of the camera feed already composited onto the canvas. */
export default class PolygonShape {

    constructor(p) {
        this.p = p;
        this.buffer = null;
    }

    draw(leftHand, rightHand, resolution = 80) {
        if (!leftHand?.visible || !rightHand?.visible) return;

        const p = this.p;
        const context = p.drawingContext;
        const points = [
            leftHand.thumb,
            leftHand.index,
            rightHand.index,
            rightHand.thumb
        ];

        const xs = points.map((point) => point.x);
        const ys = points.map((point) => point.y);
        const minX = Math.min(...xs);
        const minY = Math.min(...ys);
        const boxWidth = Math.max(1, Math.max(...xs) - minX);
        const boxHeight = Math.max(1, Math.max(...ys) - minY);

        const blockSize = p.width / resolution;
        const cols = Math.max(1, Math.round(boxWidth / blockSize));
        const rows = Math.max(1, Math.round(boxHeight / blockSize));

        if (!this.buffer || this.buffer.width !== cols || this.buffer.height !== rows) {
            this.buffer = p.createGraphics(cols, rows);
            this.buffer.noSmooth();
        }

        this.buffer.drawingContext.drawImage(
            p.canvas,
            minX, minY, boxWidth, boxHeight,
            0, 0, cols, rows
        );

        context.save();
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        points.slice(1).forEach((point) => context.lineTo(point.x, point.y));
        context.closePath();
        context.clip();
        context.imageSmoothingEnabled = false;
        context.drawImage(this.buffer.canvas, minX, minY, boxWidth, boxHeight);
        context.restore();
    }
}
