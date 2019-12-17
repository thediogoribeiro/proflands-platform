//constantes
const min = 20;
const max = 100;
const des_min = 25;
const des_max = 80;
const cor = "grey";
const larg_canvas = 400;
const alt_canvas = 400;
const pi = Math.PI;

function create_3d(i,geometry, xrot, yxot, cam_pos, cor){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, larg_canvas/alt_canvas, 0.1, 100 );
  var renderer = new THREE.WebGLRenderer();
  scene.background = new THREE.Color('white');
  renderer.setSize( larg_canvas, alt_canvas );
  document.getElementById("enunciado"+i).appendChild(renderer.domElement);
  var edges = new THREE.EdgesGeometry(geometry);
  var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 'black' }));
  scene.add(line);
  var material = new THREE.MeshBasicMaterial({ color: cor });
  var obj = new THREE.Mesh(geometry, material);
  scene.add(obj);
  line.rotation.x = xrot;
  line.rotation.y = yxot;
  obj.rotation.x = xrot;
  obj.rotation.y = yxot;
  camera.position.z = cam_pos;

  var animate = function () {
    requestAnimationFrame(animate);
    line.rotation.y += 0.01;
    obj.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
}

function draw_cube(i,x,y,z){
  var geometry = new THREE.BoxGeometry( x/100, y/100, z/100 );
  create_3d(i,geometry, 0.5, 1,2, cor);
}

function draw_prisma(i,tipo,x,z){
  if (tipo=="cilindro") var lados = 400;
  else if (tipo=="prisma") var lados = 3;
  var geometry = new THREE.CylinderGeometry(x/100, x/100, z/100, lados);
  create_3d(i,geometry, 0.5, 1,2, cor);
}

function draw_piramide(i,tipo, x, z, lados){
  var xrot=0.2;
  if (tipo=="piramide") xrot=0.5;
  var geometry = new THREE.ConeGeometry(x/100, z/100, lados);
  create_3d(i,geometry, xrot, 1.7,2, cor,tipo);
}

function draw_pent(i,h,nl) {
  var canvas = document.getElementById("canvas" + i);
  var context = canvas.getContext('2d');
  var posx = larg_canvas/2;
  var posy = alt_canvas/2;
  var step  = 2 * pi / nl;
  var shift = (pi / 180.0) * -18;
  context.beginPath();
  for (var i = 0; i <= nl;i++) {
      var curStep = i * step + shift;
      context.lineTo (posx + h * Math.cos(curStep), posy + h * Math.sin(curStep));
  }
  context.fillStyle = cor;
  context.fill();
}

function draw_hex(i,h) {
  var canvas = document.getElementById("canvas" + i);
  var context = canvas.getContext('2d');
  var posx = larg_canvas/2;
  var posy = alt_canvas/2;
  context.beginPath();
  context.moveTo(posx + h * Math.cos(0), posy + h * Math.sin(0));
  for (var i= 0; i < 7; i++) {
    context.lineTo(posx + h * Math.cos(i * 2 * pi / 6), posy + h * Math.sin(i * 2 * pi / 6));
  }
  context.fillStyle = cor;
  context.fill();
}

function draw_rect(i,h,w) {
  var canvas = document.getElementById("canvas" + i);
  var context = canvas.getContext('2d');
  context.beginPath();
  context.rect((larg_canvas-w)/2,(alt_canvas-h)/2,w,h);
  context.fillStyle = cor;
  context.fill();
}

function draw_circle(i,raio) {
  var canvas = document.getElementById("canvas" + i);
  var context = canvas.getContext('2d');
  context.beginPath();
  context.arc(larg_canvas/2, alt_canvas/2, raio, 0, 2*Math.PI);
  context.fillStyle = cor;
  context.fill();
}

function draw_triangle(i,h,w,des,posx,posy) {
  posx +=des/2;
  var canvas = document.getElementById("canvas" + i);
  var context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(w*2+posx, h*2+posy);
  context.lineTo(posx-des, h*2+posy);
  context.lineTo(posx, posy);
  context.fillStyle = cor;
  context.fill();
}

function draw_2circle(i,raio1,raio2,dentro){
  if(dentro) var start_degrees = 0;
  else var start_degrees = 180;
  var start_angle = ( Math.PI/180 ) * start_degrees;
  var end_degrees = 360;
  var end_angle = ( Math.PI/180 ) * end_degrees;
  var canvas = document.getElementById("canvas" + i);
  var context = canvas.getContext('2d');
  context.beginPath();
  context.arc(larg_canvas/2, alt_canvas/2, raio1, start_angle, end_angle,true);
  context.arc(larg_canvas/2, alt_canvas/2, raio2, start_angle, end_angle,false);
  context.fillStyle = cor;
  context.fill();
}

function draw_trapezoid(i,h,w,des,posx,posy){
  while (2*des>w-30){
    w = Math.floor((Math.random() * max) + min);
    des = Math.floor((Math.random() * des_max) + des_min);
  }
  posy +=h/2;
  var posx = (larg_canvas/2)-(w+des)/2;
  var canvas = document.getElementById("canvas" + i);
  var context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(posx+des,posy);
  context.lineTo(w+posx,posy);
  context.lineTo(w+des+posx,posy+h);
  context.lineTo(posx,posy+h);
  context.fillStyle = cor;
  context.fill();
}
