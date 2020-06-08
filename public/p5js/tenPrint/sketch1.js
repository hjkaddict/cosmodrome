// 이 라인들의 나열이 상형문자처럼 보인다.
// 상형문자처럼 나열되는 모양에서 내가 원하는 형상 (예를 들어 ㄱ 모양 혹은 ㄴ 모양)이 나오게 되면, 
// 그 형상이 

var s = 40;
var x = 0;
var y = 0;
var arr = [];
var rowNum;

function setup() {
    var canvasDiv = document.getElementById('sketch');
    var canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    canvas.parent('sketch');

    background(0);
    strokeWeight(3);
    stroke(255);

    rowNum = canvasDiv.offsetWidth / s;
    console.log(rowNum);

}


function drawLine(shape, x, y) {
    this.shape = shape;

    if (arr.length > rowNum) {
        if (arr[arr.length - 1][0] === arr[arr.length - 1 - rowNum][0]) {
            stroke(255, 0, 0);
        } else {
            stroke(255, 255, 255);
        }
    }

    if (shape === 0) { //back slash
        line(x, y, x + s, y + s);
    } else if (shape === 1) { //slash
        line(x + s, y, x, s + y);
    } else if (shape === 2) { //cross horizontal
        line(x, y + s / 2, x + s, y + s / 2);
    } else if (shape === 3) { //cross vertical
        line(x + s / 2, y, x + s / 2, y + s)
    } 
    // else if (shape === 4) { //left
    //     line(x, y, x, y + s);
    // } else if (shape === 5) { //right
    //     line(x + s, y, x + s, y + s);
    // } else if (shape === 6) { //top
    //     line(x, y, x + s, y);
    // } else if (shape === 7) { //bottom
    //     line(x, y + s, x + s, y + s)
    // }
}



function draw() {
    let randNum = int(random(4));
    drawLine(randNum, x, y);
    arr.push(new Array(randNum, x, y));

    x += s;

    if (x > width) {
        y += s;
        x = 0;
    }
    if (y > height) {
        noLoop();
    }
}