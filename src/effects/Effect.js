export default class Effect {

    constructor(p) {

        this.p = p;
        this.enabled = true;

    }

    apply(source, destination) {

        // Override in child class

    }

    update(state) {
        // Override when an effect exposes State-driven parameters.
    }

}
