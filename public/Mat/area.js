const pi = Math.PI;
const n_figuras_area = 6;


function sol_errada_area(sol){
  sol = Math.round(variacao(sol) * 100) / 100;
  return 'Area cinzenta: ' + sol+' cm<sup>2</sup>.';
}

function calc_area_triangle(h,w,des){
    var sol = ((des+w)*h)/2;
    return Math.round(sol * 100) / 100;
}
function calc_area_trapezoid(h,w,des){
    var base = w;
    var base_maior = w+des+des;
    var sol = (base_maior+base)/2*h;
    return Math.round(sol * 100) / 100;
}
function calc_area_rect(h,w){
    var sol = w*h;
    return Math.round(sol * 100) / 100;
}
/*
function calc_area_hex(lado){
    var tres_raiz_3 = 3*Math.sqrt(3)
    var lado_quad = Math.pow(lado,2)
    var sol = (tres_raiz_3*lado_quad)/2;
    return Math.round(sol * 100) / 100;
}

function calc_area_pent(lado){
    var tres_raiz_3 = 3*Math.sqrt(3)
    var lado_quad = Math.pow(lado,2)
    var sol = (tres_raiz_3*lado_quad)/2;
    return Math.round(sol * 100) / 100;
}*/

function calc_area_circle(raio){
    var raio_quad = Math.pow(raio,2)
    var sol = pi*raio_quad;
    return Math.round(sol * 100) / 100;
}

function calc_area_2circle(raio1,raio2,dentro){
    var raio_quad1 = Math.pow(raio1,2)
    var raio_quad2 = Math.pow(raio2,2)
    var area1 = pi*raio_quad1;
    var area2 = pi*raio_quad2;
    if(dentro) var sol = Math.abs(area1-area2);
    else var sol = area1+area2;
    return Math.round(sol * 100) / 100;
}

funcs[0][1] = function create_area(){
  titulo(0,1);
  pagina = 0;
  hide("materia");
  show("quizzes");
  var sol = 0;
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var canvas = '<canvas id="canvas' + i + '"  width="' + larg_canvas + '" height="'+ alt_canvas + '"></canvas>';
    var enunciado = document.getElementById("enunciado"+i);
    var h = Math.floor((Math.random() * max) + min);
    var w = Math.floor((Math.random() * max) + min);
    var des = Math.floor((Math.random() * des_max) + des_min);
    var posx = (larg_canvas-w*2)/2;
    var posy = (alt_canvas-h*2)/2;
    var geom = Math.floor(Math.random() * n_figuras_area) + 1;
    if (geom == 1) {
      enunciado.innerHTML = canvas + '<div>Base menor: ' + w + 'cm.<br>Base maior: ' + (w+des+des) + 'cm.<br>Altura: ' + h + 'cm.';
      draw_trapezoid(i,h,w,des,posx,posy);
      sol = calc_area_trapezoid(h,w,des);
    } else if(geom == 2) {
      enunciado.innerHTML = canvas + '<div>Raio circunferência 1: ' + h + 'cm.<br>Raio circunferência 2: ' + w + 'cm.';
      draw_2circle(i,h,w,true);
      sol = calc_area_2circle(h,w,true);
    }else if(geom == 3) {
      enunciado.innerHTML = canvas + '<div>Base: ' + w + 'cm.<br>Altura: ' + h + 'cm.';
      draw_rect(i,h,w);
      sol = calc_area_rect(h,w);
    }else if(geom == 4) {
      enunciado.innerHTML = canvas + '<div>Raio: ' + h + 'cm.';
      draw_circle(i,h);
      sol = calc_area_circle(h);
    }else if(geom == 5) {
      enunciado.innerHTML = canvas + '<div>Base: ' + (w+des) + 'cm.<br>Altura: ' + h + 'cm.';
      draw_triangle(i,h,w,des,posx,posy);
      sol = calc_area_triangle(h,w,des);
    }else if(geom == 6) {
      enunciado.innerHTML = canvas + '<div>Raio circunferência 1: ' + h + 'cm.<br>Raio circunferência 2: ' + w + 'cm.';
      draw_2circle(i,h,w,false);
      sol = calc_area_2circle(h,w,false);
    }
    /*else if(geom == 7) {
      enunciado.innerHTML = canvas + '<div>Lado hexágono: ' + h + 'cm.';
      draw_hex(i,h);
      sol = calc_area_hex(h);
    }else if(geom == 8) {
      enunciado.innerHTML = canvas + '<div>Lado pentágono: ' + h + 'cm.';
      draw_pent(i,h);
      sol = calc_area_pent(h);
    }*/
    write_solutions(i,sol_errada_area(sol),sol_errada_area(sol),sol_errada_area(sol),'Area cinzenta: ' + sol+ ' cm<sup>2</sup>.');
  }
}
