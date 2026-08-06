import Renderer from "./rendering/Renderer.js";
console.log("Sketch loaded");


export default function sketch(p) {

    let renderer;

    p.setup = () => {
        console.log("Setup running");

        p.createCanvas(
            p.windowWidth,
            p.windowHeight
        );

        p.pixelDensity(1);

        renderer = new Renderer(p);

    };

    p.draw = () => {

        renderer.render();
        

    };

 p.windowResized = () => {

    p.resizeCanvas(
        window.innerWidth,
        window.innerHeight
    );


        renderer.resize();

    };

}