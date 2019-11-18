//constantes
const min = 20;
const max = 100;
const des_min = 25;
const des_max = 80;
const larg_canvas = 400;
const alt_canvas = 400;
const pi = Math.PI;
const n_figuras_area = 6;
const geometrias = require('./../geometrias');
const script = require('./../../script');


function sol_errada_area(sol){
  return Math.round(script.variacao(sol,50) * 100) / 100;
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

module.exports = {
  f : function(i){
    var h, w, des, geom, q;
    var dataURL = null;
    h = Math.floor((Math.random() * max) + min);
    w = Math.floor((Math.random() * max) + min);
    des = Math.floor((Math.random() * des_max) + des_min);
    geom = Math.floor(Math.random() * n_figuras_area) + 1;
    var posx = (larg_canvas-w*2)/2;
    var posy = (alt_canvas-h*2)/2;
    if (geom == 1) {
      q = 'Base menor: ' + w + 'cm.<br>Base maior: ' + (w+des+des) + 'cm.<br>Altura: ' + h + 'cm.';
      dataURL = geometrias.draw_trapezoid(i,h,w,des,posx,posy);
      sol = calc_area_trapezoid(h,w,des);
    } else if(geom == 2) {
      q = 'Raio circunferência 1: ' + h + 'cm.<br>Raio circunferência 2: ' + w + 'cm.';
      dataURL = geometrias.draw_2circle(i,h,w,true);
      sol = calc_area_2circle(h,w,true);
    }else if(geom == 3) {
      q = 'Base: ' + w + 'cm.<br>Altura: ' + h + 'cm.';
      dataURL = geometrias.draw_rect(i,h,w);
      sol = calc_area_rect(h,w);
    }else if(geom == 4) {
      q = 'Raio: ' + h + 'cm.';
      dataURL = geometrias.draw_circle(i,h);
      sol = calc_area_circle(h);
    }else if(geom == 5) {
      q = 'Base: ' + (w+des) + 'cm.<br>Altura: ' + h + 'cm.';
      dataURL = geometrias.draw_triangle(i,h,w,des,posx,posy);
      sol = calc_area_triangle(h,w,des);
    }else if(geom == 6) {
      q = 'Raio circunferência 1: ' + h + 'cm.<br>Raio circunferência 2: ' + w + 'cm.';
      dataURL = geometrias.draw_2circle(i,h,w,false);
      sol = calc_area_2circle(h,w,false);
    }
    var s1 = 'Area cinzenta: ' +sol_errada_area(sol)+ ' cm<sup>2</sup>.'
    var s2 = 'Area cinzenta: ' +sol_errada_area(sol)+ ' cm<sup>2</sup>.'
    var s3 = 'Area cinzenta: ' +sol_errada_area(sol)+ ' cm<sup>2</sup>.'
    var s4 = 'Area cinzenta: ' +sol_errada_area(sol)+ ' cm<sup>2</sup>.'
    var s5 = 'Area cinzenta: ' +sol+ ' cm<sup>2</sup>.'
    var rand = Math.floor(Math.random() * 4) + 1;
    if(rand==1){s1=s5}
    else if(rand==2){s2=s5}
    else if(rand==3){s3=s5}
    else if(rand==4){s4=s5}
    var cs ='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+s1+'</label><br>';
    cs+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+s2+'</label><br>';
    cs+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+s3+'</label><br>';
    cs+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+s4+'</label><br>';
    return {q:q, cs:cs, solution:s5, image:dataURL}
  }
};
