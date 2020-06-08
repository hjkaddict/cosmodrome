const nMovers = 60;

function Mover() {
    this.location = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector(-0.001, 0.01);
    this.topSpeed = random(8, 10);
    this.dirMag = random(0.5, 1.2);

    this.update = function () {
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.location);
        dir.normalize();
        dir.mult(this.dirMag);
        this.acceleration = dir;




        // Random accel
        // this.acceleration = p5.Vector.random2D();
        // this.acceleration.mult(random(2));

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topSpeed);
        this.location.add(this.velocity);
    };

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
    };

    this.display = function () {
        stroke(0);
        fill(10, 20, 180);
        ellipse(this.location.x, this.location.y, 16, 16);
    };
}

let movers = [];

function setup() {
    for (let i = 0; i < nMovers; i++) {
        let mover = new Mover();
        movers.push(mover);
    }

    var canvasDiv = document.getElementById('sketch');
    var canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    canvas.parent('sketch');
}

function draw() {
    background(250, 60, 40);
    for (let i = 0; i < movers.length; i++) {
        movers[i].update();
        movers[i].display();
    }
    //mover.checkEdges();
}