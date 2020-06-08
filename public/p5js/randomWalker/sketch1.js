let mover;

function Mover() {
    this.location = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector(-0.001, 0.01);
    this.topSpeed = 10;

    this.update = function () {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.location.add(this.velocity);
    }

    this.checkEdges = function () {
        if (this.location.x > width) {
            this.location.x = 0;
        } else if (this.location.x <= 0) {
            this.location.x = width;
        }

        if (this.location.y > height) {
            this.location.y = 0;
        } else if (this.location.y <= 0) {
            this.location.y = height;
        }
    }

    this.display = function () {
        stroke(0);
        fill(10, 20, 180);
        ellipse(this.location.x, this.location.y, 16, 16);

    }
}

function setup() {
    var canvasDiv = document.getElementById('sketch');
    var canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    canvas.parent('sketch');

    mover = new Mover();
}

function draw() {
    background(250, 60, 40);
    mover.update();
    mover.checkEdges();
    mover.display();

}

