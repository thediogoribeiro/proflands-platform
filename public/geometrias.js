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
