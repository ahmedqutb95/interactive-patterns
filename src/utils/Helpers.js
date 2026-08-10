/** Computes the source rect that fills a target box without distortion ("cover" fit). */
export function getCoverRect(sourceWidth, sourceHeight, targetWidth, targetHeight) {
    const sourceAspect = sourceWidth / sourceHeight;
    const targetAspect = targetWidth / targetHeight;

    let sWidth = sourceWidth;
    let sHeight = sourceHeight;

    if (sourceAspect > targetAspect) {
        sWidth = sourceHeight * targetAspect;
    } else {
        sHeight = sourceWidth / targetAspect;
    }

    return {
        sx: (sourceWidth - sWidth) / 2,
        sy: (sourceHeight - sHeight) / 2,
        sWidth,
        sHeight
    };
}
