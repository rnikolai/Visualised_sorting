var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var range = document.getElementById("range");
var speed = document.getElementById("speed");

var gapBox = document.getElementById("gap");
var gap = 0;

var time = -1;

var widthOfBar = 10;
var Size = Math.floor((innerWidth - 100) / (widthOfBar + gap));

var running = false; //there are corrently working sorters

class Bar {
  constructor(x, y, val, state) {
    this.x = x;
    this.y = y;
    this.val = val;
    this.state = -1;
  }
  draw() {
    switch (this.state) {
      case 0:
        c.fillStyle = "#4CAF50";
        break;
      case 1:
        c.fillStyle = "blue";
        break;
      default:
        c.fillStyle = "white";

    }

    c.fillRect(this.x, this.y, widthOfBar, this.val);
  }
}

var Bars = [];
var Bars_c = [];

//lockdown

function disableElement() {
  document.getElementById("new").setAttribute("disabled", "disabled");
  document.getElementById("qs").setAttribute("disabled", "disabled");
  document.getElementById("ss").setAttribute("disabled", "disabled");
  document.getElementById("range").setAttribute("disabled", "disabled");
  document.getElementById("gap").setAttribute("disabled", "disabled");
}

function enableElement() {
  document.getElementById("new").removeAttribute("disabled");
  document.getElementById("qs").removeAttribute("disabled");
  document.getElementById("ss").removeAttribute("disabled");
  document.getElementById("range").removeAttribute("disabled");
  document.getElementById("gap").removeAttribute("disabled");
}

gapBox.onclick = function () {
  gap = (gapBox.checked) ? 1 : 0;
  generateNewArray();
};

function newSize() {
  widthOfBar = Math.floor((innerWidth - 100) / range.value + gap);
  Size = Math.floor((innerWidth - 100) / (widthOfBar));
  generateNewArray();
}
//range and new are same need new method
range.onclick = function () {
  newSize();
};

document.getElementById("new").onclick = function () {
  newSize();
};

document.getElementById("qs").onclick = async function () {
  disableElement();
  var t0 = performance.now();
  await quickSort(Bars, 0, Bars.length - 1);
  var t1 = performance.now();
  time = t1 - t0;
  enableElement();
  console.log(time + " " + Bars_c.length + " " + Bars.length);
};

document.getElementById("ss").onclick = async function () {
  disableElement();
  var t0 = performance.now();
  await slowSort(Bars, 0, Bars.length - 1);
  var t1 = performance.now();
  time = t1 - t0;
  enableElement();
  console.log(time + " " + Bars_c.length + " " + Bars.length);
};

document.getElementById("bs").onclick = async function () {
  disableElement();
  var t0 = performance.now();
  await bubbleSort(Bars, 0, Bars.length);
  var t1 = performance.now();
  time = t1 - t0;
  enableElement();
  console.log(time + " " + Bars_c.length + " " + Bars.length);

};


//qs

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  var index = await partition(arr, start, end);

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

//ss

async function slowSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  var index = await partition(arr, start, end);

  await slowSort(arr, start, index - 1);
  await slowSort(arr, index + 1, end);
}

async function partition(arr, start, end) {
  var pivotValue = arr[end].val;
  var pivotIndex = start;
  for (var i = start; i < end; i++) {
    if (arr[i].val < pivotValue) {
      await swap(arr, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(arr, pivotIndex, end);
  return pivotIndex;
}

//bs

async function bubbleSort(arr, start, end) {
  for (i = 0; i < end; i++) {
    for (j = 0; j < end - i - 1; j++) {
      if (arr[j].val > arr[j + 1].val) {
        await swap(arr, j, j + 1);
      }
    }
    j = 0;
  }
}


//shared functions

function generateNewArray() {
  Bars.splice(0, Bars.length);
  Bars_c.splice(0, Bars_c.length);
  c.clearRect(0, 0, innerWidth, innerHeight); // remove old
  for (i = 0; i < Size; i++) {
    Bars.push(
      new Bar(50 + i * (widthOfBar + gap), 50, Math.round(Math.random() * 500) + 5, 0)
    );
  }
  Redraw();
  //console.log(Bars);
}

generateNewArray();

function Redraw() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < Bars.length; i++) {
    Bars[i].draw();
  }
}

async function swap(arr, a, b) {
  var t3 = performance.now();
  await delay(speed.value);
  var t4 = performance.now();
  Bars_c.push({ a, b });
  var temp = arr[a].val;
  arr[a].val = arr[b].val;
  arr[b].val = temp;
  swapOnGraph(arr, a, b);
  
  console.log(t4 - t3);
}

function swapOnGraph(arr, a, b) {
  c.clearRect(arr[a].x, arr[a].y, widthOfBar, 505);
  c.clearRect(arr[b].x, arr[b].y, widthOfBar, 505);
  arr[a].draw();
  arr[b].draw();
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}