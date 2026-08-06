export default class EffectManager {

    constructor() {

        this.camera = [];
        this.scene = [];

    }

    addCamera(effect) {

        this.camera.push(effect);

    }

    addScene(effect) {

        this.scene.push(effect);

    }

    applyCamera(source) {

        let current = source;

        for (const effect of this.camera) {

            if (!effect.enabled) continue;

            current = effect.apply(current);

        }

        return current;

    }

    applyScene(source) {

        let current = source;

        for (const effect of this.scene) {

            if (!effect.enabled) continue;

            current = effect.apply(current);

        }

        return current;

    }

}