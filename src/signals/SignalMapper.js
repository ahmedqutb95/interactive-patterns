export default class SignalMapper {

    constructor(p, signals) {

        this.p = p;
        this.signals = signals;

        this.overlay = {
            hue: 220,
            opacity: 100
        };

    }


    update() {

        const hand0 = this.signals.hand[0].pinch;
        const hand1 = this.signals.hand[1].pinch;

        this.overlay.opacity = this.p.map(
            hand0,
            0,
            1,
            20,
            220
        );

        this.overlay.hue = this.p.map(
            hand1,
            0,
            1,
            180,
            360
        );

    }

}