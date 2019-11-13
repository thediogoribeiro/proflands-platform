//constantes
const min = 20;
const max = 100;
const des_min = 25;
const des_max = 80;
const cor = "grey";
const larg_canvas = 400;
const alt_canvas = 400;
const pi = Math.PI;
const Canvas = require('canvas');
const Image = Canvas.Image;
const canvas = new Canvas.Canvas(alt_canvas, larg_canvas);
const context = canvas.getContext('2d');

function create_3d(geometry, scene, camera, renderer, xrot, yxot, cam_pos, cor){
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

module.exports = {
  draw_cube:function(scene, camera, renderer,x,y,z){
    var geometry = new THREE.BoxGeometry( x/100, y/100, z/100 );
    create_3d(geometry,scene, camera, renderer, 0.5, 1,2, cor);
  },


  draw_prisma:function(scene, camera, renderer,tipo,x,z){
    if (tipo=="cilindro") var lados = 400;
    else if (tipo=="prisma") var lados = 3;
    var geometry = new THREE.CylinderGeometry(x/100, x/100, z/100, lados);
    create_3d(geometry,scene, camera, renderer, 0.5, 1,2, cor);
  },

  draw_piramide:function(scene, camera, renderer, tipo, x, z, lados){
    var xrot=0.2;
    if (tipo=="piramide") xrot=0.5;
    var geometry = new THREE.ConeGeometry(x/100, z/100, lados);
    create_3d(geometry,scene, camera, renderer, xrot, 1.7,2, cor,tipo);
  },

  draw_pent:function(i,h,nl) {
    var canvas = new Canvas.Canvas(alt_canvas, larg_canvas);
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
    return canvas.toDataURL();
  },

  draw_hex:function(i,h) {
    var canvas = new Canvas.Canvas(alt_canvas, larg_canvas);
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
    return canvas.toDataURL();
  },

  draw_rect:function(i,h,w) {
    var canvas = new Canvas.Canvas(alt_canvas, larg_canvas);
    var context = canvas.getContext('2d');
    context.beginPath();
    context.rect((larg_canvas-w)/2,(alt_canvas-h)/2,w,h);
    context.fillStyle = cor;
    context.fill();
    return canvas.toDataURL();
  },

  draw_circle:function(i,raio) {
    var canvas = new Canvas.Canvas(alt_canvas, larg_canvas);
    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(larg_canvas/2, alt_canvas/2, raio, 0, 2*Math.PI);
    context.fillStyle = cor;
    context.fill();
    return canvas.toDataURL();
  },

  draw_triangle:function(i,h,w,des,posx,posy) {
    var canvas = new Canvas.Canvas(alt_canvas, larg_canvas);
    var context = canvas.getContext('2d');
    posx +=des/2;
    context.beginPath();
    context.moveTo(w*2+posx, h*2+posy);
    context.lineTo(posx-des, h*2+posy);
    context.lineTo(posx, posy);
    context.fillStyle = cor;
    context.fill();
    return canvas.toDataURL();
  },

  draw_2circle:function(i,raio1,raio2,dentro){
    var canvas = new Canvas.Canvas(alt_canvas, larg_canvas);
    var context = canvas.getContext('2d');
    var r1,r2;
    if (raio1>raio2) {
      r1=raio1;
      r2=raio2;
    }else {
      r1=raio2;
      r2=raio1;
    }
      context.beginPath();
    if(dentro){
      context.arc(larg_canvas/2, alt_canvas/2, r1, ( Math.PI/180 ) * 0, ( Math.PI/180 ) * 360,true);
      context.fillStyle = cor;
      context.fill();
      context.beginPath();
      context.arc(larg_canvas/2, alt_canvas/2, r2, ( Math.PI/180 ) * 0, ( Math.PI/180 ) * 360,false);
      context.fillStyle = 'white';
      context.fill();
    }
    else{
      context.arc(larg_canvas/2, alt_canvas/2, r1, ( Math.PI/180 ) * 0, ( Math.PI/180 ) * 180,true);
      context.fillStyle = cor;
      context.fill();
      context.beginPath();
      context.arc(larg_canvas/2, alt_canvas/2, r2, ( Math.PI/180 ) * 180, ( Math.PI/180 ) * 0,true);
      context.fillStyle = cor;
      context.fill();
    }

    return canvas.toDataURL();
  },

  draw_trapezoid:function(i,h,w,des,posx,posy){
    var canvas = new Canvas.Canvas(alt_canvas, larg_canvas);
    var context = canvas.getContext('2d');
    while (2*des>w-30){
      w = Math.floor((Math.random() * max) + min);
      des = Math.floor((Math.random() * des_max) + des_min);
    }
    posy +=h/2;
    var posx = (larg_canvas/2)-(w+des)/2;
    context.beginPath();
    context.moveTo(posx+des,posy);
    context.lineTo(w+posx,posy);
    context.lineTo(w+des+posx,posy+h);
    context.lineTo(posx,posy+h);
    context.fillStyle = cor;
    context.fill();
    return canvas.toDataURL();
  }
};
