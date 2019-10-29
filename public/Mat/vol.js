const n_figuras_vol = 6;
var scene;
var camera;
var renderer;

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
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, larg_canvas/alt_canvas, 0.1, 100 );
  renderer = new THREE.WebGLRenderer();
  scene.background = new THREE.Color('white');
  renderer.setSize( larg_canvas, alt_canvas );
  document.getElementById("enunciado"+i).appendChild(renderer.domElement);
}


funcs[1][0] = function (){
  titulo(1,0);
  pagina = 0;
  hide("materia");
  show("quizzes");
  var sol = 0;
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var x = Math.floor((Math.random() * max) + min);
    var y = Math.floor((Math.random() * max) + min);
    var z = Math.floor((Math.random() * max) + min);
    var enunciado = document.getElementById("enunciado"+i);
    var geom = Math.floor(Math.random() * n_figuras_vol) + 1;
    if (geom == 1) {
      enunciado.innerHTML = '<div>Raio: ' + x + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      var lados = draw_piramide(scene,camera,renderer,"cone",x,z);
      sol = calc_vol_piramide(x,z,"cone",lados);
    }else if(geom==2){
      enunciado.innerHTML = '<div>Aresta 1: ' + x + 'cm.<br>Aresta 2: ' + y + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      draw_cube(scene,camera,renderer,x,y,z);
      sol = calc_vol_cubo(x,y,z);
    }else if(geom==3){
      enunciado.innerHTML = '<div>Raio: ' + x + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      draw_prisma(scene,camera,renderer,"cilindro",x,z);
      sol = calc_vol_prisma(x,z);
    }else if(geom==4){
      enunciado.innerHTML = '<div>Aresta: ' + x + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      var lados = draw_piramide(scene,camera,renderer,"piramide",x,z);
      sol = calc_vol_piramide(x,z,"piramide",lados);
    }else if(geom==5){
      enunciado.innerHTML = '<div>Aresta: ' + x + 'cm.<br>Altura: ' + z + 'cm.';
      create_scene(i);
      draw_prisma(scene,camera,renderer,"prisma",x,z);
      sol = calc_vol_prisma(x,z);
    }else if(geom==6){
      enunciado.innerHTML = '<div>Aresta: ' + x + 'cm.';
      create_scene(i);
      draw_cube(scene,camera,renderer,x,x,x);
      sol = calc_vol_cubo(x,x,x);
    }
    write_solutions(i,sol_errada_vol(sol),sol_errada_vol(sol),sol_errada_vol(sol),'Volume: ' + sol + ' cm<sup>3</sup>.');
  }
}
