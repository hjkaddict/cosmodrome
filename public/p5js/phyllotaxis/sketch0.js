function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES);
    noLoop();
}

function draw() {
    background(255, 100, 100);
    translate(width / 2, height / 2);

    let nPoints = 300;
    let c = 15;

    for (let n = 0; n < nPoints; n++) {
        stroke(0);
        fill(255);
        let angle = n * 137.5;
        let r = c * sqrt(n);
        x = cos(angle) * r;
        y = sin(angle) * r;
        ellipse(x, y, 15, 15);
    }
}