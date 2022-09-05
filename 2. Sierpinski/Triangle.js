//Clear canvas
let ctx = null, canvas = null;


function sierpinskiTriangle(ctx, pos, length, iteration) {

  //Calculate data for next iteration
  const newIterationLength = length / 2;
  const newIterationPos = [
    pos, [pos[0] + newIterationLength, pos[1]], [pos[0] + newIterationLength / 2, pos[1] - Math.sin(Math.PI / 3) * newIterationLength]
  ];

  //Iterations
  if (iteration == 0) {
    drawTriangles(ctx, pos, length)
  }
  else if (iteration == 1) {
    newIterationPos.forEach((coordinates) => {
      drawTriangles(ctx, coordinates, newIterationLength);
    });
  } else {
    newIterationPos.forEach((coordinates) => {
      sierpinskiTriangle(ctx, coordinates, newIterationLength, iteration - 1);
    })
  }
}



function drawTriangles(ctx, pos, length) {
  //Color picker
  color = getRandomColor();

  //Triangle draw
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(...pos);
  //Lines:
  //Left bottom to top
  ctx.lineTo(pos[0] + length / 2, pos[1] - length * Math.sin(Math.PI / 3));
  //Top to right bottom
  ctx.lineTo(pos[0] + length, pos[1]);
  //Right bottom to left bottom
  ctx.lineTo(...pos);
  ctx.fill();

}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function main() {
  //Create Canvas
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  //document variables: Same width and height aspect ratio
  dw = canvas.width / 4;
  dh = canvas.height / 1.5;

  //triangle size 
  length = canvas.height / 2;

  //Slider Handlers
  var slider = document.getElementById("myRange");
  var output = document.getElementById("value");
  output.innerHTML = slider.value;


  sierpinskiTriangle(ctx, [dw, dh], length, 1);
}
main()