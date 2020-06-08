let circles = [];
let circlesPerDrawCall = 1;
const maxAttempts = 100;

function Circle(x, y) {
    this.x = x;
    this.y = y;
    this.r = 2;
    this.growing = true;

    this.show = function () {
        stroke(255);
        noFill();
        strokeWeight(2);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.grow = function () {
        if (this.growing) {
            this.r += 0.5;
        }
    }

    this.edges = function () {
        return (
            this.x + this.r >= width ||
            this.x - this.r <= 0 ||
            this.y + this.r >= height ||
            this.y - this.r <= 0
        );
    }
}

function setup() {
    var canvasDiv = document.getElementById('sketch');
    var canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    canvas.parent('sketch');
}

function draw() {
    background(0);
    frameRate(20);

    // Add 5 circle everytime
    let count = 0;
    let attempts = 0;
    while (count < circlesPerDrawCall) {
        let circle = newCircle();
        if (circle !== null) {
            circles.push(circle);
            count++;
        }
        attempts++;
        if (attempts > maxAttempts || circles.length > 2000) {
            noLoop();
            console.log('finished');
            break;
        }
    }

    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        if (circle.growing) {
            if (circle.edges()) {
                circle.growing = false;
            } else {
                // does it touches other circles?
                for (let j = 0; j < circles.length; j++) {
                    let other = circles[j];
                    if (circle !== other) {
                        let d = dist(circle.x, circle.y, other.x, other.y);
                        let sumRadius = circle.r + other.r;

                        if (d < sumRadius) {
                            circle.growing = false;
                            break;
                        }
                    }
                }
            }
        }

        circle.grow();
        circle.show();
    }
}

function newCircle() {
    let x = random(width);
    let y = random(height);
    let valid = true;

    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        let d = dist(x, y, circle.x, circle.y);
        if (d < circle.r) {
            valid = false;
            break;
        }
    }

    if (valid) {
        return new Circle(x, y);
    } else {
        return null;
    }

}

