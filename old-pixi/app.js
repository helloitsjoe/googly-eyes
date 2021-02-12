const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let mouseDown = false;
let spacebarDown = false;
let leftDown = false;
let rightDown = false;


function addEye(x, y) {

    const initialMax = 40;
    const initialMin = 30;
    const initialSize = Math.random() * (initialMax - initialMin) + initialMin;
    const pupilSize = initialSize * 3/5;
    const initialGoogly = (Math.random() - 0.5) * (pupilSize * 0.8); // Don't let pupil go all the way to edge

    const googlyX = x + initialGoogly;
    const googlyY = y + initialGoogly;

    circle(x, y, initialSize, 'white');
    circle(googlyX, googlyY, pupilSize, 'black');
}

function circle(cx, cy, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx,cy,radius,0,Math.PI*2,true);
    ctx.fill();
}

function update() {
    if (leftDown) {

    }
    if (rightDown) {

    }
}

function loop() {
    update();
    render();

    requestAnimationFrame(loop);
}

// requestAnimationFrame(loop);

function render() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

render();

window.addEventListener('click', (event) => {
    let xPos = event.clientX;
    let yPos = event.clientY;
    addEye(xPos, yPos);
});

// for keyCode reference: http://keycode.info/

window.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
        spacebarDown = true;
        if (cy === canvas.height) {
            vy -= 50;
        }
    }
    if (event.keyCode === 37) {
        leftDown = true;
    }
    if (event.keyCode === 39) {
        rightDown = true;
    }
});

window.addEventListener('keyup', (event) => {
    if (event.keyCode === 32) {
        spacebarDown = false;
    }
    if (event.keyCode === 37) {
        leftDown = false;
    }
    if (event.keyCode === 39) {
        rightDown = false;
    }
});



// API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
