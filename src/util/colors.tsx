// credits: https://graphicdesign.stackexchange.com/a/83867
// Returns a single rgb color interpolation between given rgb color
// based on the factor given; via https://codepen.io/njmcode/pen/axoyD?editors=0010
function interpolateColor(color1: Array<number>, color2: Array<number>, factor: number) {
    if (arguments.length < 3) { 
        factor = 0.5; 
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
}
// My function to interpolate between two colors completely, returning an array
function interpolateColors(color1str: string, color2str: string, steps: number) {
    var stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    let color1 = color1str.match(/\d+/g)!.map(Number);
    let color2 = color2str.match(/\d+/g)!.map(Number);

    if (steps == 1) {
        return [color1];
    }

    for(var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    return interpolatedColorArray;
}
export {
    interpolateColor,
    interpolateColors
}
