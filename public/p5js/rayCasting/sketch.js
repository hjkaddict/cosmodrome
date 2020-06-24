function setup() {
    var divWidth = $("#sketchContainer").innerWidth()
    var divHeight = $('#sketchContainer').innerHeight();
    var myCanvas = createCanvas(divWidth, divHeight);
    myCanvas.parent('sketchContainer');
}

function draw() {
    background(0);
    fill(255, 255, 0);
    ellipse(width / 2, height / 2, 500, 500);
}

function windowResized() {
    resizeCanvas($("#sketchContainer").innerWidth(), $('#sketchContainer').innerHeight());
}