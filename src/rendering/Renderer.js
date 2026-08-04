import Camera from "../camera/Camera.js";
import HandTracker from "../mediapipe/HandTracker.js";

import Dot from "../ui/Dot.js";
import Line from "../ui/Line.js";
import DistanceMeter from "../ui/DistanceMeter.js";

import Theme from "../ui/Theme.js";
import Signals from "../signals/Signals.js";

import SignalMapper from "../signals/SignalMapper.js";

export default class Renderer {

    constructor(p) {

        console.log("Renderer created");

        this.p = p;

        this.buffer = p.createGraphics(
            p.width,
            p.height
        );

        this.smoothedHands = [];
        this.signals = new Signals();
        this.mapper = new SignalMapper(
            p,
            this.signals
        );

        // UI
        this.dot = new Dot(p);
        this.line = new Line(p);
        this.distanceMeter = new DistanceMeter(p);

        // Camera
        this.camera = new Camera();
        this.ready = false;

        this.camera.start().then(async () => {

            this.ready = true;

            console.log("Camera Ready");

            this.handTracker = new HandTracker(
                this.camera.getVideo()
            );

            await this.handTracker.init();

        });

    }

    render() {

        this.p.background(0);

        if (!this.ready) return;

        const video = this.camera.getVideo();

        if (video.readyState < 2) return;

        this.drawCamera(video);

        this.p.image(
            this.buffer,
            0,
            0
        );

        const results = this.handTracker.update();

        if (results) {
            this.drawHands(results);
        }

        this.mapper.update();

    }

    resize() {

        this.buffer.resizeCanvas(
            this.p.width,
            this.p.height
        );

    }

    drawCamera(video) {

        const g = this.buffer;

        g.clear();

        const vw = video.videoWidth;
        const vh = video.videoHeight;

        const scale = Math.max(
            g.width / vw,
            g.height / vh
        );

        const w = vw * scale;
        const h = vh * scale;

        const x = (g.width - w) * 0.5;
        const y = (g.height - h) * 0.5;

        if (this.camera.mirror) {
            g.push();

            g.translate(g.width, 0);
            g.scale(-1, 1);

            g.drawingContext.drawImage(
                video,
                x,
                y,
                w,
                h
            );

            g.pop();
        } else {

            g.drawingContext.drawImage(
                video,
                x,
                y,
                w,
                h
            );

        }

        g.drawingContext.drawImage(
            video,
            x,
            y,
            w,
            h
        );

        g.colorMode(
            this.p.HSB,
            360,
            100,
            100,
            255
        );

        g.noStroke();

        g.fill(
            this.mapper.overlay.hue,
            100,
            20,
            this.mapper.overlay.opacity
        );

        g.rect(
            0,
            0,
            g.width,
            g.height
        );

        g.colorMode(this.p.RGB);
    }

    drawHands(results) {

        if (!results.landmarks?.length) return;

        results.landmarks.forEach((hand, handIndex) => {

            if (!this.smoothedHands[handIndex]) {

                this.smoothedHands[handIndex] = hand.map(point => ({
                    x: point.x,
                    y: point.y
                }));

            }

            const smoothValue = 0.6;

            hand.forEach((point, pointIndex) => {

                const smooth = this.smoothedHands[handIndex][pointIndex];

                smooth.x = this.p.lerp(
                    smooth.x,
                    point.x,
                    smoothValue
                );

                smooth.y = this.p.lerp(
                    smooth.y,
                    point.y,
                    smoothValue
                );

            });

            const thumb = this.smoothedHands[handIndex][4];
            const index = this.smoothedHands[handIndex][8];

            const tx = thumb.x * this.p.width;
            const ty = thumb.y * this.p.height;

            const ix = index.x * this.p.width;
            const iy = index.y * this.p.height;

            const distance = this.p.dist(
                tx,
                ty,
                ix,
                iy
            );

            this.signals.hand[handIndex].pinch = this.p.map(
                distance,
                20,     // fingers touching
                250,    // fingers fully open
                0,
                1,
                true
            );

            this.line.draw(
                tx,
                ty,
                ix,
                iy
            );

            this.dot.draw(
                tx,
                ty
            );

            this.dot.draw(
                ix,
                iy
            );

            this.distanceMeter.signal =
                this.signals.hand[handIndex].pinch;


            this.distanceMeter.draw(
                tx,
                ty,
                ix,
                iy
            );

        
        });

    }

}