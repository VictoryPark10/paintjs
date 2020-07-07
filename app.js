const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;     // 700
canvas.height = CANVAS_SIZE;    // 700

// canvas background init
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// line color/size, fillRect color init
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

// painting off
function stopPainting() {
    painting = false;
}

// painting on
function startPainting() {
    painting = true;
}

// paint line
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// change color
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

// line size control
function handelRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

// change (paint button <-> fill button)
function handelModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

// fill canvas
function handelCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// cannot mouse right button
function handelCM(event) {
    event.preventDefault();
}

// save image to png
function handelSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "myPaintJS[EXPORT]";
    link.click();
}

// canvas event
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handelCanvasClick);
    canvas.addEventListener("contextmenu", handelCM);
}

// make color palette
Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

// line size control event
if (range) {
    range.addEventListener("input", handelRangeChange);
}

// change mode event (paint <-> fill)
if (mode) {
    mode.addEventListener("click", handelModeClick);
}

// save image to png event
if (saveBtn) {
    saveBtn.addEventListener("click", handelSaveClick);
}