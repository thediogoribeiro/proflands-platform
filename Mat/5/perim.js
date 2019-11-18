const n_figuras_perim = 5;
const geometrias = require('./../geometrias');
const script = require('./../../script');
const min = 20;
const max = 100;
const des_min = 25;
const des_max = 80;
const pi = Math.PI;
const larg_canvas = 400;
const alt_canvas = 400;

function sol_errada_perim(sol){
  sol = Math.round(script.variacao(sol,50) * 100) / 100;
  return sol;
}

function calc_hip(b,h){
  var soma = Math.pow(b,2) + Math.pow(h,2);
  return Math.round(Math.sqrt(soma));
}

function calc_perim_triangle(hip1,hip2,w,des){
  var sol = hip1+hip2+des+w;
  return Math.round(sol * 100) / 100;
}
function calc_perim_trapezoid(hip1,w,des){
  var sol = 2*(hip1+des+w);
  return Math.round(sol * 100) / 100;
}
function calc_perim_rect(h,w){
  var sol = 2*(w+h);
  return Math.round(sol * 100) / 100;
}

function calc_perim_circle(raio){
  var sol = 2*pi*raio;
  return Math.round(sol * 100) / 100;
}

function calc_perim_2circle(raio1,raio2,dentro){
  return Math.round(sol * 100) / 100;
}

function calc_perim_hex(h){
  sol = 6*h;
  return Math.round(sol * 100) / 100;
}

function calc_perim_pent(h,nl){
  sol = nl*h;
  return Math.round(sol * 100) / 100;
}

module.exports = {
  f : function(i){
    var h, w, des, geom, nl;
    h = Math.floor((Math.random() * max) + min);
    w = Math.floor((Math.random() * max) + min);
    nl = Math.floor((Math.random() * 6) + 5);
    des = Math.floor((Math.random() * des_max) + des_min);
    geom = Math.floor(Math.random() * n_figuras_perim) + 1;
    var posx = (larg_canvas-w*2)/2;
    var posy = (alt_canvas-h*2)/2;
    var hip1 = calc_hip(des,h);
    var hip2 = calc_hip(w,h);
    if (geom == 1){
      q = 'Base menor: ' + w + 'cm.<br>Base maior: ' + (w+des+des) + 'cm.<br>Lado 1: ' + hip1 + 'cm.<br>Lado 2: ' + hip1 + 'cm.';
      dataURL = geometrias.draw_trapezoid(i,h,w,des,posx,posy);
      sol = calc_perim_trapezoid(hip1,w,des);
    }else if(geom == 2){
      q = 'Lado 1: ' + hip1 + 'cm.<br>lado 2: ' + hip2 + 'cm.<br>Base: ' + (w+des) + 'cm.';
      dataURL = geometrias.draw_triangle(i,h,w,des,posx,posy);
      sol = calc_perim_triangle(hip1,hip2,w,des);
    }else if(geom == 3){
      q = 'Base: ' + w + 'cm.<br>Altura: ' + h + 'cm.';
      dataURL = geometrias.draw_rect(i,h,w);
      sol = calc_perim_rect(h,w);
    }else if(geom == 4){
      q = 'Raio: ' + h + 'cm.';
      dataURL = geometrias.draw_circle(i,h);
      sol = calc_perim_circle(h);
    }else if(geom == 5){
      q = 'Lado: ' + h + 'cm.';
      dataURL = geometrias.draw_pent(i,h,nl);
      sol = calc_perim_pent(h,nl);
    }
    var s1 = 'Perimetro: : ' +sol_errada_perim(sol)+ ' cm.'
    var s2 = 'Perimetro: : ' +sol_errada_perim(sol)+ ' cm.'
    var s3 = 'Perimetro: : ' +sol_errada_perim(sol)+ ' cm.'
    var s4 = 'Perimetro: : ' +sol_errada_perim(sol)+ ' cm.'
    var s5 = 'Perimetro: : ' +sol+ ' cm.'
    var rand = Math.floor(Math.random() * 4) + 1;
    if(rand==1){s1=s5}
    else if(rand==2){s2=s5}
    else if(rand==3){s3=s5}
    else if(rand==4){s4=s5}
    var cs ='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+s1+'</label><br>';
    cs+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+s2+'</label><br>';
    cs+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+s3+'</label><br>';
    cs+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+s4+'</label><br>';
    return {q:q, solution:s5, cs:cs, image:dataURL}
  }
};
