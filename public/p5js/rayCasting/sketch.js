

function setup() {
    var divWidth = $("#sketchTest").innerWidth()
    var divHeight = $('#sketchTest').innerHeight();
    var myCanvas = createCanvas(divWidth, divHeight);
    myCanvas.parent('sketchTest');
}

function draw() {
    background(0);
    fill(255, 255, 0);
    ellipse(width / 2, height / 2, 500, 500);
}



function windowResized() {
    resizeCanvas($("#sketchTest").innerWidth(), $('#sketchTest').innerHeight());
}