import Camera from "../camera/Camera.js";
import Tracker from "../tracking/Tracker.js";
import State from "../state/State.js";
import EffectManager from "../effects/EffectManager.js";
import Scene from "./Scene.js";
import HUD from "../ui/HUD.js";

/** Coordinates the installation pipeline; modules own all actual work. */
export default class Renderer {

    constructor(p) {
        this.p = p;
        this.camera = new Camera();
        this.state = new State(p);
        this.effects = new EffectManager();
        this.scene = new Scene(p, this.effects);
        this.hud = new HUD(p);
        this.tracker = new Tracker(this.camera.getVideo());

        this.camera.start().then(async () => {
            await this.tracker.init();
        });
    }

    render() {
        this.camera.update();
        this.tracker.update();
        this.state.update(
            this.tracker.results,
            this.camera.mirror,
            this.tracker.hasNewResults
        );
        //this.effects.update(this.state);
        this.scene.draw(this.camera.getVideo(), this.state, this.camera.mirror);
        this.hud.draw(this.state);
    }

    resize() {
        this.scene.resize();
    }
}
