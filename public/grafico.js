var sol = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var sol2 = new Array(10);
for (var k = 0; k < sol2.length; k++) {
  sol2[k] = new Array(6);
  for (var m = 0; m<6;m++){
    sol2[k][m]=false;
  }
}
var sol3 = new Array(10);
for (var k = 0; k < sol3.length; k++) {
  sol3[k] = new Array(6);
  for (var m = 0; m<6;m++){
    sol3[k][m]=-99;
  }
}

function getXYretaNum(canvas,nums,decimals,des,comp, event) {
  var i = Number(canvas.id.replace("canvas", ""));
  create_reta_num(i,nums[i],des);
  var ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  ctx.beginPath();
  ctx.fillStyle = 'red';
  if (nums[i]<0) ctx.arc((((Math.trunc(nums[i])*decimals[i])-des)*25)+x, y-canvas.height/2, 4, 0, 2 * Math.PI, false);
  else ctx.arc((((Math.round(nums[i])*decimals[i])-des)*25)+x, y-canvas.height/2, 4, 0, 2 * Math.PI, false);
  ctx.fill();
  if (decimals[i]==1 && x>=(190+((des-8)*25)) && x<=(210+((des-8)*25)))
  sol[i] = 1;
  else if ((decimals[i]==2 || decimals[i]==3) && x>=(165+(((comp[i]+des)-8)*25)) && x<=(185+(((comp[i]+des)-8)*25)))
  sol[i] =1;
}

function getXYgraf(canvas, tV, event) {
  var i = Number(canvas.id.replace("canvas", ""));
  var ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  x=x-(25*8);
  y=y-(25*8);
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(x, y,4, 0, 2 * Math.PI, false);
  ctx.fill();
  if(entre(x,tV[0]*25-5,tV[0]*25+5) && entre(y,-tV[6]*25-5, -tV[6]*25+5)) sol2[i][0]=true;
  if(entre(x,tV[1]*25-5,tV[1]*25+5) && entre(y,-tV[7]*25-5, -tV[7]*25+5)) sol2[i][1]=true;
  if(entre(x,tV[2]*25-5,tV[2]*25+5) && entre(y,-tV[8]*25-5, -tV[8]*25+5)) sol2[i][2]=true;
  if(entre(x,tV[3]*25-5,tV[3]*25+5) && entre(y,-tV[9]*25-5, -tV[9]*25+5)) sol2[i][3]=true;
  if(entre(x,tV[4]*25-5,tV[4]*25+5) && entre(y,-tV[10]*25-5, -tV[10]*25+5)) sol2[i][4]=true;
  if(entre(x,tV[5]*25-5,tV[5]*25+5) && entre(y,-tV[11]*25-5, -tV[11]*25+5)) sol2[i][5]=true;
}

function ver_reta_num(i){
  return sol;
}

function ver_graf(i){
  if (sol2[i][0] && sol2[i][1] && sol2[i][2] && sol2[i][3] && sol2[i][4] && sol2[i][5])
  return true;
}

function ver_graf2(i){
  var s = new Array(6);
  for(var j =0;j<6;j++){
    var e = document.getElementById("sel"+j+i);
    s[j] = e.options[e.selectedIndex].value;
  }
  if (s[0]==sol3[i][0] && s[1]==sol3[i][1] && s[2]==sol3[i][2] && s[3]==sol3[i][3] && s[4]==sol3[i][4] && s[5]==sol3[i][5])
  return true;
}

function create_reta_num(i,num,des){

  var decimals =  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
  var nums =  [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
  var comp =  [0,0,0,0,0,0,0,0,0,0];
  sol[i]=-1;
  var n = num;
  nums[i] = num;
  var canvas = document.getElementById("canvas" + i);
  var ctx = canvas.getContext("2d");
  canvas.height = 200;
  var decimal = Math.abs(Math.round((num%1)*10));
  if (decimal==7 && num<0) comp[i]-=1;
  else if (decimal==3 && num>0) comp[i]+=2;
  if (decimal==0) decimal=1;
  else if (decimal==5) decimal=2;
  else if (decimal==7) decimal=3;
  decimals[i] = decimal;
  var canvas_width = canvas.width;
  var canvas_height = canvas.height;

  var grid_size = 25;
  var x_axis_distance_grid_lines = canvas_height/100*2;
  if (num<0) var y_axis_distance_grid_lines = (des-(Math.trunc(num)*decimal));
  else var y_axis_distance_grid_lines = (des-(Math.round(num)*decimal));
  var x_axis_starting_point = { number: 1, suffix: '' };
  var y_axis_starting_point = { number: 1, suffix: '' };

  var num_lines_x = Math.floor(canvas_height/grid_size);
  var num_lines_y = Math.floor(canvas_width/grid_size);
  canvas.addEventListener('mousedown', function(e) {
    getXYretaNum(canvas,nums,decimals,des,comp, e)
  });
  // Draw grid lines along X-axis
  for(var i=0; i<=num_lines_x; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    // If line represents X-axis draw in different color
    if(i == x_axis_distance_grid_lines){
      ctx.strokeStyle = "#000000";
    }
    else
    ctx.strokeStyle = "#e9e9e9";
    if(i == num_lines_x) {
      ctx.moveTo(0, grid_size*i);
      ctx.lineTo(canvas_width, grid_size*i);
    }
    else {
      ctx.moveTo(0, grid_size*i+0.5);
      ctx.lineTo(canvas_width, grid_size*i+0.5);
    }
    ctx.stroke();
  }

  // Draw grid lines along Y-axis
  for(i=0; i<=num_lines_y; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#e9e9e9";
    if(i == num_lines_y) {
      ctx.moveTo(grid_size*i, 0);
      ctx.lineTo(grid_size*i, canvas_height);
    }
    else {
      ctx.moveTo(grid_size*i+0.5, 0);
      ctx.lineTo(grid_size*i+0.5, canvas_height);
    }
    ctx.stroke();
  }

  // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
  ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

  // Ticks marks along the positive X-axis (and 0)
  var v = 0;//qnt maior V mais para a esquerda os valores ficam
  if (decimal==2) v = 2;
  else if(decimal==3) v = 2;
  else if (decimal==1) v = 1;
  for(i=1; i<(num_lines_y - y_axis_distance_grid_lines)*decimal; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    // Draw a tick mark 6px long (-3 to 3)
    if (i%decimal==0){
      ctx.moveTo(grid_size*(i)+0.5, -6);
      ctx.lineTo(grid_size*(i)+0.5, 6);
      ctx.stroke();
      // Text value at that point
      ctx.font = '13px Arial';
      ctx.textAlign = 'start';
      var num = Math.round((i/decimal) * 10) / 10;
      if((n*decimal-(des-v))==i||(n*decimal-(des-v-1))==i||(n*decimal-(des-v-2))==i)ctx.fillText(num+ x_axis_starting_point.suffix, grid_size*(i)-2, 25);
    }else{
      ctx.moveTo(grid_size*(i)+0.5, -3);
      ctx.lineTo(grid_size*(i)+0.5, 3);
      ctx.stroke();
      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      var num = Math.round((i/decimal) * 10) / 10;
      if((n*decimal-(des-v))==i||(n*decimal-(des-v-1))==i||(n*decimal-(des-v-2))==i)ctx.fillText(num+ x_axis_starting_point.suffix, grid_size*(i)-2, 20);
    }
  }

  // Ticks marks along the negative X-axis (not 0)
  for(i=0; i<y_axis_distance_grid_lines*decimal; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    // Draw a tick mark 6px long (-3 to 3)
    if (i%decimal==0){
      ctx.moveTo(-grid_size*(i)+0.5, -6);
      ctx.lineTo(-grid_size*(i)+0.5, 6);
      ctx.stroke();
      // Text value at that point
      ctx.font = '13px Arial';
      ctx.textAlign = 'end';
      var num = Math.round((i/decimal) * 10) / 10;
      if((-n*decimal+(des-v))==i||(-n*decimal+(des-v-1))==i||(-n*decimal+(des-v-2))==i)ctx.fillText(-num+ x_axis_starting_point.suffix, -grid_size*(i)+3, 25);
    }else{
      ctx.moveTo(-grid_size*(i)+0.5, -3);
      ctx.lineTo(-grid_size*(i)+0.5, 3);
      ctx.stroke();
      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'end';
      var num = Math.round((i/decimal) * 10) / 10;
      if((-n*decimal+(des-v))==i||(-n*decimal+(des-v-1))==i||(-n*decimal+(des-v-2))==i)ctx.fillText(-num+ x_axis_starting_point.suffix, -grid_size*(i)+3, 20);
    }
  }
}

function create_graf(i,tV){
  var grid_size = 25;
  var x_axis_distance_grid_lines = 8;
  var y_axis_distance_grid_lines = 8;
  var x_axis_starting_point = { number: 1, suffix: '' };
  var y_axis_starting_point = { number: 1, suffix: '' };

  var canvas = document.getElementById("canvas"+i);
  var ctx = canvas.getContext("2d");

  var canvas_width = canvas.width;
  var canvas_height = canvas.height;

  var num_lines_x = Math.floor(canvas_height/grid_size);
  var num_lines_y = Math.floor(canvas_width/grid_size);
  canvas.addEventListener('mousedown', function(e) {
    getXYgraf(canvas,tV, e)
  });

  // Draw grid lines along X-axis
  for(var i=0; i<=num_lines_x; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;

    // If line represents X-axis draw in different color
    if(i == x_axis_distance_grid_lines)
    ctx.strokeStyle = "#000000";
    else
    ctx.strokeStyle = "#e9e9e9";

    if(i == num_lines_x) {
      ctx.moveTo(0, grid_size*i);
      ctx.lineTo(canvas_width, grid_size*i);
    }
    else {
      ctx.moveTo(0, grid_size*i+0.5);
      ctx.lineTo(canvas_width, grid_size*i+0.5);
    }
    ctx.stroke();
  }

  // Draw grid lines along Y-axis
  for(i=0; i<=num_lines_y; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;

    // If line represents X-axis draw in different color
    if(i == y_axis_distance_grid_lines)
    ctx.strokeStyle = "#000000";
    else
    ctx.strokeStyle = "#e9e9e9";

    if(i == num_lines_y) {
      ctx.moveTo(grid_size*i, 0);
      ctx.lineTo(grid_size*i, canvas_height);
    }
    else {
      ctx.moveTo(grid_size*i+0.5, 0);
      ctx.lineTo(grid_size*i+0.5, canvas_height);
    }
    ctx.stroke();
  }

  // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
  ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

  // Ticks marks along the positive X-axis
  for(i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(grid_size*i+0.5, -3);
    ctx.lineTo(grid_size*i+0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i-2, 15);
  }

  // Ticks marks along the negative X-axis
  for(i=1; i<y_axis_distance_grid_lines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-grid_size*i+0.5, -3);
    ctx.lineTo(-grid_size*i+0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'end';
    ctx.fillText(-x_axis_starting_point.number*i + x_axis_starting_point.suffix, -grid_size*i+3, 15);
  }

  // Ticks marks along the positive Y-axis
  // Positive Y-axis of graph is negative Y-axis of the canvas
  for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, grid_size*i+0.5);
    ctx.lineTo(3, grid_size*i+0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, grid_size*i+3);
  }

  // Ticks marks along the negative Y-axis
  // Negative Y-axis of graph is positive Y-axis of the canvas
  for(i=1; i<x_axis_distance_grid_lines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, -grid_size*i+0.5);
    ctx.lineTo(3, -grid_size*i+0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -grid_size*i+3);
  }
}

function create_graf2(i,tVs){
  var grid_size = 25;
  var x_axis_distance_grid_lines = 8;
  var y_axis_distance_grid_lines = 8;
  var x_axis_starting_point = { number: 1, suffix: '' };
  var y_axis_starting_point = { number: 1, suffix: '' };

  var canvas = document.getElementById("canvas"+i);
  var ctx = canvas.getContext("2d");

  var canvas_width = canvas.width;
  var canvas_height = canvas.height;

  var num_lines_x = Math.floor(canvas_height/grid_size);
  var num_lines_y = Math.floor(canvas_width/grid_size);
  for(var x = 0;x<6;x++){
    sol3[i][x] = tVs[x+6];
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(200+(25*tVs[x]), 200-(25*tVs[x+6]),4, 0, 2 * Math.PI, false);
    ctx.fill();
  }
  ctx.fillStyle = 'black';
  // Draw grid lines along X-axis
  for(var i=0; i<=num_lines_x; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;

    // If line represents X-axis draw in different color
    if(i == x_axis_distance_grid_lines)
    ctx.strokeStyle = "#000000";
    else
    ctx.strokeStyle = "#e9e9e9";

    if(i == num_lines_x) {
      ctx.moveTo(0, grid_size*i);
      ctx.lineTo(canvas_width, grid_size*i);
    }
    else {
      ctx.moveTo(0, grid_size*i+0.5);
      ctx.lineTo(canvas_width, grid_size*i+0.5);
    }
    ctx.stroke();
  }

  // Draw grid lines along Y-axis
  for(i=0; i<=num_lines_y; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;

    // If line represents X-axis draw in different color
    if(i == y_axis_distance_grid_lines)
    ctx.strokeStyle = "#000000";
    else
    ctx.strokeStyle = "#e9e9e9";

    if(i == num_lines_y) {
      ctx.moveTo(grid_size*i, 0);
      ctx.lineTo(grid_size*i, canvas_height);
    }
    else {
      ctx.moveTo(grid_size*i+0.5, 0);
      ctx.lineTo(grid_size*i+0.5, canvas_height);
    }
    ctx.stroke();
  }

  // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
  ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

  // Ticks marks along the positive X-axis
  for(i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(grid_size*i+0.5, -3);
    ctx.lineTo(grid_size*i+0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i-2, 15);
  }

  // Ticks marks along the negative X-axis
  for(i=1; i<y_axis_distance_grid_lines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-grid_size*i+0.5, -3);
    ctx.lineTo(-grid_size*i+0.5, 3);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'end';
    ctx.fillText(-x_axis_starting_point.number*i + x_axis_starting_point.suffix, -grid_size*i+3, 15);
  }

  // Ticks marks along the positive Y-axis
  // Positive Y-axis of graph is negative Y-axis of the canvas
  for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, grid_size*i+0.5);
    ctx.lineTo(3, grid_size*i+0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, grid_size*i+3);
  }

  // Ticks marks along the negative Y-axis
  // Negative Y-axis of graph is positive Y-axis of the canvas
  for(i=1; i<x_axis_distance_grid_lines; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";

    // Draw a tick mark 6px long (-3 to 3)
    ctx.moveTo(-3, -grid_size*i+0.5);
    ctx.lineTo(3, -grid_size*i+0.5);
    ctx.stroke();

    // Text value at that point
    ctx.font = '9px Arial';
    ctx.textAlign = 'start';
    ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -grid_size*i+3);
  }
}
