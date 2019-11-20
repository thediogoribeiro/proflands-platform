const n_figuras_vol = 6;
const min = 20;
const max = 100;
const pi = Math.PI;
const script = require('./../../script');

function sol_errada_vol(sol){
  sol = Math.round(script.variacao(sol,50) * 100) / 100;
  return sol;
}

function calc_vol_cubo(x,y,z){
  var sol = x*y*z;
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




module.exports = {
  f : function(i){
    var x, y, z, geom, ladosPir, exec;
    x = Math.floor((Math.random() * max) + min);
    y = Math.floor((Math.random() * max) + min);
    z = Math.floor((Math.random() * max) + min);
    geom = Math.floor(Math.random() * n_figuras_vol) + 1;
    ladosPir = Math.floor((Math.random() *2) + 3);
    if (geom == 1) {
      q = 'Raio: ' + x + 'cm.<br>Altura: ' + z + 'cm.<br>';
      exec = 'draw_piramide('+i+',"cone", '+x+', '+z+', 400)';
      sol = calc_vol_piramide(x,z,"cone", 400);
    }else if(geom==2){
      q = 'Aresta 1: ' + x + 'cm.<br>Aresta 2: ' + y + 'cm.<br>Altura: ' + z + 'cm.<br>';
      exec = 'draw_cube('+i+','+x+','+y+','+z+')';
      sol = calc_vol_cubo(x,y,z);
    }else if(geom==3){
      q = 'Raio: ' + x + 'cm.<br>Altura: ' + z + 'cm.<br>';
      exec = 'draw_prisma('+i+',"cilindro",'+x+','+z+')';
      sol = calc_vol_prisma(x,z);
    }else if(geom==4){
      q = 'Aresta: ' + x + 'cm.<br>Altura: ' + z + 'cm.<br>';
      exec = 'draw_piramide('+i+',"piramide", '+x+', '+z+', '+ladosPir+')';
      sol = calc_vol_piramide(x,z,"piramide",ladosPir);
    }else if(geom==5){
      q = 'Aresta: ' + x + 'cm.<br>Altura: ' + z + 'cm.<br>';
      exec = 'draw_prisma('+i+',"prisma",'+x+','+z+')';
      sol = calc_vol_prisma(x,z);
    }else if(geom==6){
      q = 'Aresta: ' + x + 'cm.<br>';
      exec = 'draw_cube('+i+','+x+','+x+','+x+')';
      sol = calc_vol_cubo(x,x,x);
    }
    var s2 = [-1,-1,-1,-1];
    var s = new Array(4);
    while (s2[0]==s2[1] || s2[0]==s2[2] || s2[1]==s2[2]){
      s2[0] = 'Volume: ' + sol_errada_vol(sol) + ' cm<sup>3</sup>.';
      s2[1] = 'Volume: ' + sol_errada_vol(sol) + ' cm<sup>3</sup>.';
      s2[2] = 'Volume: ' + sol_errada_vol(sol) + ' cm<sup>3</sup>.';
    }
    s2[3] = sol;
    for(var cont = 0; cont<4 ; cont++){
      var rand = Math.floor(Math.random() * (4-cont));
      s[cont] = s2[rand];
      s2.splice(rand, 1);
    }
    var cs ='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+s[0]+'</label><br>';
    cs+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+s[1]+'</label><br>';
    cs+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+s[2]+'</label><br>';
    cs+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+s[3]+'</label><br>';
    console.log(sol);
    return {q:q, solution:sol, cs:cs, exec:exec}
  }
};
