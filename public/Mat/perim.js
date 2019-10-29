const n_figuras_perim = 5;


function sol_errada_perim(sol){
  sol = Math.round(variacao(sol) * 100) / 100;
  return 'Perimetro: ' + sol;
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

funcs[0][2] = function create_perim(){
  titulo(0,2);
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
    var nl = Math.floor((Math.random() * 6) + 5);
    var des = Math.floor((Math.random() * des_max) + des_min);
    var posx = (larg_canvas-w*2)/2;
    var posy = (alt_canvas-h*2)/2;
    var hip1 = calc_hip(des,h);
    var hip2 = calc_hip(w,h);
    var geom = Math.floor(Math.random() * n_figuras_perim) + 1;
    if (geom == 1) {
      enunciado.innerHTML = canvas + '<div>Base menor: ' + w + 'cm.<br>Base maior: ' + (w+des+des) + 'cm.<br>Lado 1: ' + hip1 + 'cm.<br>Lado 2: ' + hip1 + 'cm.';
      draw_trapezoid(i,h,w,des,posx,posy);
      sol = calc_perim_trapezoid(hip1,w,des);
    } else if(geom == 2) {
      enunciado.innerHTML = canvas + '<div>Lado 1: ' + hip1 + 'cm.<br>lado 2: ' + hip2 + 'cm.<br>Base: ' + (w+des) + 'cm.';
      console.log("h: " + h + "w: " + w + "des: " + des + "hip1: " + hip1 + "hip2: " + hip2)
      draw_triangle(i,h,w,des,posx,posy);
      sol = calc_perim_triangle(hip1,hip2,w,des);
    }else if(geom == 3) {
      enunciado.innerHTML = canvas + '<div>Base: ' + w + 'cm.<br>Altura: ' + h + 'cm.';
      draw_rect(i,h,w);
      sol = calc_perim_rect(h,w);
    }else if(geom == 4) {
      enunciado.innerHTML = canvas + '<div>Raio: ' + h + 'cm.';
      draw_circle(i,h);
      sol = calc_perim_circle(h);
    }else if(geom == 5) {
      enunciado.innerHTML = canvas + '<div>Lado: ' + h + 'cm.';
      draw_pent(i,h,nl);
      sol = calc_perim_pent(h,nl);
    }
    write_solutions(i,sol_errada_perim(sol),sol_errada_perim(sol),sol_errada_perim(sol),'Perimetro: ' + sol);
  }
}
