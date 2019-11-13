const n_figuras_vol = 6;
const larg_canvas = 400;
const alt_canvas = 400;
var scene;
var camera;
var renderer;

const geometrias = require('./../geometrias');
const three = require('./../three');

function sol_errada_vol(sol){
  sol = Math.round(variacao(sol) * 100) / 100;
  return 'Volume: ' + sol + ' cm<sup>3</sup>.';
}

function calc_vol_cubo(x,y,z){
  var area_base = calc_area_rect(x,y);
  var sol = area_base * z;
  return Math.round(sol * 100) / 100;
}

function calc_vol_prisma(x,z,tipo){
  if(tipo="cilindro") var area_base = Math.pow(x,2)*pi;
  if(tipo="prisma") var area_base = Math.pow(x,2)/2;
  var sol = area_base * z;
  return Math.round(sol * 100) / 100;
}

function calc_vol_piramide(x,z,tipo,lados){
  if(tipo="cone") var area_base = Math.pow(x,2)*pi;
  if(tipo="piramide"){
    var area_base = Math.pow(x,2);
    if(lados==3) area_base = area_base/2;
  }
  var sol = (1/3)*area_base*z;
  return Math.round(sol * 100) / 100;
}

function create_scene(i){
  scene = new three.THREE.Scene();
  camera = new three.THREE.PerspectiveCamera( 75, larg_canvas/alt_canvas, 0.1, 100 );
  renderer = new three.THREE.WebGLRenderer();
  scene.background = new three.THREE.Color('white');
  renderer.setSize( larg_canvas, alt_canvas );
}


module.exports = {
  f : function(i){
    var x, y, z, geom, ladosPir;
    x = Math.floor((Math.random() * max) + min);
    y = Math.floor((Math.random() * max) + min);
    z = Math.floor((Math.random() * max) + min);
    geom = Math.floor(Math.random() * n_figuras_vol) + 1;
    ladosPir = Math.floor((Math.random() *2) + 3);
    if (geom == 1) {
      q = 'Raio: ' + x + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      draw_piramide(scene, camera, renderer, "cone", x, z, 400);
      sol = calc_vol_piramide(x,z,"cone", 400);
    }else if(geom==2){
      q = 'Aresta 1: ' + x + 'cm.<br>Aresta 2: ' + y + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      draw_cube(scene,camera,renderer,x,y,z);
      sol = calc_vol_cubo(x,y,z);
    }else if(geom==3){
      q = 'Raio: ' + x + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      draw_prisma(scene,camera,renderer,"cilindro",x,z);
      sol = calc_vol_prisma(x,z);
    }else if(geom==4){
      q = 'Aresta: ' + x + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      draw_piramide(scene, camera, renderer, "piramide", x, z, ladosPir);
      sol = calc_vol_piramide(x,z,"piramide",ladosPir);
    }else if(geom==5){
      q = 'Aresta: ' + x + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      draw_prisma(scene,camera,renderer,"prisma",x,z);
      sol = calc_vol_prisma(x,z);
    }else if(geom==6){
      q = 'Aresta: ' + x + 'cm.';
      create_scene(i);
      draw_cube(scene,camera,renderer,x,x,x);
      sol = calc_vol_cubo(x,x,x);
    }
    write_solutions(i,sol_errada_vol(sol),sol_errada_vol(sol),sol_errada_vol(sol),'Volume: ' + sol + ' cm<sup>3</sup>.');
    var s1 = 'Volume: ' + sol_errada_vol(sol) + ' cm<sup>3</sup>.';
    var s2 = 'Volume: ' + sol_errada_vol(sol) + ' cm<sup>3</sup>.';
    var s3 = 'Volume: ' + sol_errada_vol(sol) + ' cm<sup>3</sup>.';
    var s4 = 'Volume: ' + sol_errada_vol(sol) + ' cm<sup>3</sup>.';
    var s5 = 'Volume: ' + sol_errada_vol(sol) + ' cm<sup>3</sup>.';
    var rand = Math.floor(Math.random() * 4) + 1;
    if(rand==1){s1=s5}
    else if(rand==2){s2=s5}
    else if(rand==3){s3=s5}
    else if(rand==4){s4=s5}
    return {q:q, s1:s1, s2:s2, s3:s3, s4:s4, solution:s5, image:dataURL}
  }
};
