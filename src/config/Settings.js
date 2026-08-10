export const HandSignals = Object.freeze({
    smoothing: Object.freeze({
        stationary: 0.18,
        moving: 0.65,
        maximumDelta: 0.06
    }),
    tracking: Object.freeze({
        detectionConfidence: 0.5,
        presenceConfidence: 0.5,
        trackingConfidence: 0.5
    }),
    pinch: Object.freeze({
        minimumDistance: 20,
        maximumDistance: 250
    }),
    pixelate: Object.freeze({
        resolution: Object.freeze({ minimum: 20, maximum: 160 })
    }),
    rotation: Object.freeze({
        closedPinch: 0.08,
        openPinch: 0.2,
        minimumRadius: 64
    }),
    depth: Object.freeze({
        // wrist-to-middle-MCP span in normalized landmark space (resolution independent)
        minimumSpan: 0.06,
        maximumSpan: 0.22,
        scale: Object.freeze({ minimum: 0.6, maximum: 1.8 })
    })
});
