var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var range = document.getElementById("range");
var speed = document.getElementById("speed");

var w = 1;
var Size = Math.floor((innerWidth - 100) / w);

var gap = false;
var running = false; //there are corrently working sorters

class Bar {
  constructor(x, y, val, state) {
    this.x = x;
    this.y = y;
    this.val = val;
    this.state = 1;
  }
  draw() {
    if (this.state == 0) {
      c.fillStyle = "#e61919";
    } else if (this.state == 1) {
      c.fillStyle = "#4CAF50";
    } else if ((this.state = -1)) {
      c.fillStyle = "white";
    } else {
      c.fillStyle = "ED6FFB7";
    }

    c.fillRect(this.x, this.y, w, this.val);
  }
}

var Bars = [];

//lockdown

function disableElement() {
  document.getElementById("new").disabled = true;
}

range.onclick = function () {

  w = 101 - range.value; //101 is based on sliders max value
  Size = Math.floor((innerWidth - 100) / w);
  generateNewArray();

};

document.getElementById("new").onclick = function () {
  generateNewArray();
};

document.getElementById("qs").onclick = function () {
  disableElement();
  quickSort(Bars, 0, Bars.length - 1);
};

document.getElementById("ss").onclick = function () {
  slowSort(Bars, 0, Bars.length - 1);
};
/*
document.getElementById("bs").onclick = function () {
  bubbleSort(Bars, 0, Bars.length - 1);
};
*/

//qs

async function quickSort(arr, start, end) {
  if (start >= end) {
    for (i = 0; i <= Bars.lengthi; i++) Bars[i].state = -1;
    Redraw();
    return;
  }
  var index = await partition(arr, start, end);
  Bars[index].state = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (var i = start; i < end; i++) {
    Bars[i].state = 1;
  }

  var pivotValue = arr[end].val;
  var pivotIndex = start;
  Bars[pivotIndex].states = 0;
  for (var i = start; i < end; i++) {
    if (arr[i].val < pivotValue) {
      await swap(arr, i, pivotIndex);

      Bars[pivotIndex].state = -1;
      pivotIndex++;
      Bars[pivotIndex].state = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (var i = start; i < end; i++) {
    if (i != pivotIndex) {
      Bars[i].state = -1;
    }
  }
  return pivotIndex;
}

//ss

async function slowSort(arr, start, end) {
  if (start >= end) {
    for (i = 0; i <= Bars.lengthi; i++) Bars[i].state = -1;
    Redraw();
    return;
  }

  var index = await partitionS(arr, start, end);
  Bars[index].state = -1;

  await slowSort(arr, start, index - 1), await slowSort(arr, index + 1, end);
}
async function partitionS(arr, start, end) {
  for (var i = start; i < end; i++) {
    Bars[i].state = 1;
  }

  var pivotValue = arr[end].val;
  var pivotIndex = start;
  Bars[pivotIndex].states = 0;
  for (var i = start; i < end; i++) {
    if (arr[i].val < pivotValue) {
      await swap(arr, i, pivotIndex);

      Bars[pivotIndex].state = -1;
      pivotIndex++;
      Bars[pivotIndex].state = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (var i = start; i < end; i++) {
    if (i != pivotIndex) {
      Bars[i].state = -1;
    }
  }
  return pivotIndex;
}

//bs

async function bubbleSort() {
  for (i = 0; i < Bars.length; i++) {
    Bars[i].state = 0;
    j = 0;
    for (j = 0; j < Bars.length - i - 1; j++) {
      Bars[j].state = -1;

      if (Bars[j].val > Bars[j + 1].val) {
        swap(Bars ,j, j+1);
      }
      Bars[j].state = 0;
    }
    Bars[i].state = 1;
  }
}

//shared functions

function generateNewArray() {
  Bars.splice(0, Bars.length);
  c.clearRect(0, 0, innerWidth, innerHeight); // remove old
  for (i = 0; i < Size; i++) {
    Bars.push(
      new Bar(50 + i * (w + gap), 50, Math.round(Math.random() * 500) + 5, 0)
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
  var temp = arr[a].val;
  arr[a].val = arr[b].val;
  arr[b].val = temp;
  Redraw();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}