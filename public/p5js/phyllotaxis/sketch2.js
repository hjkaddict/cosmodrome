
const max_number_of_points = 2;
let n = 0;
const c = 10;
let start = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    background(0, 0, 0);
}

function draw() {
    translate(width / 2, height / 2);
    let i;
    for (i = 0; i < n; i++) {
        // Algorithm!
        let a = i * 137.5;
        let r = c * sqrt(i);

        // conversion from polar coordinates system to cartesian coordinates
        let x = r * cos(a);
        let y = r * sin(a);

        noStroke();
        ellipse(x, y, 5, 5);
    }
    if (i < max_number_of_points) {
        n += 1;
    }
}