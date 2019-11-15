var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var range = document.getElementById("range");
var speed = document.getElementById("speed");

var widthOfBar = 1;
var Size = Math.floor((innerWidth - 100) / widthOfBar);

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
    /* if (this.state == 0) {
      c.fillStyle = "#e61919";
    } else if (this.state == 1) {
      c.fillStyle = "#4CAF50";
    } else if (this.state == -1) {
      c.fillStyle = "white";
    } else if(this.state == 2) {
      c.fillStyle = "blue";
    }  else if(this.state == 3) {
      c.fillStyle = "purple";
    } */
    c.fillStyle = "white";
    c.fillRect(this.x, this.y, widthOfBar, this.val);
  }
}

var Bars = [];

//lockdown

function disableElement() {
  document.getElementById("new").setAttribute("disabled","disabled");
  document.getElementById("qs").setAttribute("disabled","disabled");
  document.getElementById("ss").setAttribute("disabled","disabled");
  document.getElementById("range").setAttribute("disabled","disabled");
}

function enableElement() {
  document.getElementById("new").removeAttribute("disabled");
  document.getElementById("qs").removeAttribute("disabled");
  document.getElementById("ss").removeAttribute("disabled");
  document.getElementById("range").removeAttribute("disabled");
}

range.onclick = function() {
  widthOfBar = Math.floor((innerWidth - 100) /  range.value); //101 is based on sliders max value
  Size = Math.floor((innerWidth - 100) / widthOfBar); //TO-DO add a size control
  generateNewArray();
};

document.getElementById("new").onclick = function() {
  generateNewArray();
};

document.getElementById("qs").onclick = function() {
  disableElement();
  quickSort(Bars, 0, Bars.length - 1);
  //Redraw();
};

document.getElementById("ss").onclick = function() {
 replace(Bars,1,10);
};
/*
document.getElementById("bs").onclick = function () {
  bubbleSort(Bars, 0, Bars.length - 1);
};
*/

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

//ss

async function slowSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  var index = await partitionS(arr, start, end);

  await slowSort(arr, start, index - 1);
  await slowSort(arr, index + 1, end);
}
async function partitionS(arr, start, end) {
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

/* async function bubbleSort() {
  for (i = 0; i < Bars.length; i++) {
    arr[i].state = 0;
    j = 0;
    for (j = 0; j < Bars.length - i - 1; j++) {
      arr[j].state = -1;

      if (arr[j].val > arr[j + 1].val) {
        swap(Bars, j, j + 1);
      }
      Bars[j].state = 0;
    }
    Bars[i].state = 1;
  }
}
*/

//shared functions

function generateNewArray() {
  Bars.splice(0, Bars.length);
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
  await sleep(speed.value);
  var temp = arr[a].val;
  arr[a].val = arr[b].val;
  arr[b].val = temp;
  replace(arr,a,b);
}

function replace(arr,a,b){
  c.clearRect(arr[a].x ,arr[a].y , widthOfBar , 505);
  Bars[a].draw();
  c.clearRect(arr[b].x ,arr[b].y , widthOfBar , 505);
  Bars[b].draw();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}