'use strict';

let container = {
  data:
  [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]],
  state: 0
};

let newData ;

var request = new XMLHttpRequest();

var skippingTurn = false;

var player = 1;
var lineColor = "#ddd";

var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 500;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);

function getInitialBoard (defaultValue) {
  var board = [];

  for (var x = 0;x < 3;x++) {
    board.push([]);


    for (var y = 0;y < 3;y++) {
      board[x].push(defaultValue);
    }
  }


  return board;
}

var board = getInitialBoard("");

function addPlayingPiece (mouse) {
  var xCordinate;
  var yCordinate;


  for (var x = 0;x < 3;x++) {
    for (var y = 0;y < 3;y++) {
      xCordinate = x * sectionSize;
      yCordinate = y * sectionSize;

      if (
          mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize &&
          mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize
        ) {

        if (container.data[y][x] != 0&&container.state!=-1){
          skippingTurn = true;
          return
        }
        clearPlayingArea(xCordinate, yCordinate);

        if (player === 1) {

          drawX(xCordinate, yCordinate);
          container.data[y][x] = 2;

        } else {

          drawO(xCordinate, yCordinate);
          container.data[y][x] = 1;
        }
      }
    }
  }

  request.open('PUT', 'http://localhost:8080/game')
  request.setRequestHeader(
      'Content-type', 'application/json')

  request.onload = function (){
    newData = JSON.parse(request.responseText)
    container = newData;
  }
  request.send(JSON.stringify(container))

  if(container.state == 1 || container.state == 2 || container.state == -1){
    clearPlayingArea(0, 0);
    clearPlayingArea(166.66666666666666, 0);
    clearPlayingArea(333.3333333333333, 0);

    clearPlayingArea(0, 166.66666666666666);
    clearPlayingArea(166.66666666666666, 166.66666666666666);
    clearPlayingArea(333.3333333333333, 166.66666666666666);

    clearPlayingArea(0, 333.3333333333333);
    clearPlayingArea(166.66666666666666, 333.3333333333333);
    clearPlayingArea(333.3333333333333, 333.3333333333333);
  }



}

function clearPlayingArea (xCordinate, yCordinate) {
  context.fillStyle = "#fff";
  context.fillRect(
    xCordinate,
    yCordinate,
    sectionSize,
    sectionSize
  ); 
}
function drawO (xCordinate, yCordinate) {

  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCordinate + halfSectionSize;
  var centerY = yCordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#01bBC2";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX (xCordinate, yCordinate) {
  context.strokeStyle = "#f1be32";

  context.beginPath();
  
  var offset = 50;
  context.moveTo(xCordinate + offset, yCordinate + offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

  context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
  context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

  context.stroke();
}

function drawLines (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLenght = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  /*
   * Horizontal lines 
   */
  for (var y = 1;y <= 2;y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLenght, y * sectionSize);
  }

  /*
   * Vertical lines 
   */
  for (var x = 1;x <= 2;x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLenght);
  }

  context.stroke();
}

drawLines(10, lineColor);

function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mouseup', function (event) {
  if(!skippingTurn){

    if (player === 1) {
      player = 2;
    } else {
      player = 1;
    }
  }
  skippingTurn=false;

  var canvasMousePosition = getCanvasMousePosition(event);

  addPlayingPiece(canvasMousePosition);
  drawLines(10, lineColor);
});