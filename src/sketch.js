import Renderer from "./rendering/Renderer.js";

export default function sketch(p) {

    let renderer;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        renderer = new Renderer(p);
    };

    p.draw = () => {
        renderer.render();
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

}