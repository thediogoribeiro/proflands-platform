
function criaTabela2(i,tableXY){
  let set = new Set([tableXY[6],tableXY[7],tableXY[8],tableXY[9],tableXY[10],tableXY[11]]);
  var v = Array.from(set);
  v.sort(function(a,b){return b-a;});
  var select = new Array(6);
  for(var k = 0; k<6;k++){
    select[k] = '<select id="sel'+k+i+'">';
    for(var j = 0; j< v.length;j++){
      select[k] += '<option value="'+ v[j] +'">'+ v[j] +'</option>';
    }
    select[k] += '</select>';
  }

  var table = '<table style="width:400px"><tr>';
  table += '<th>x</th><td>'+tableXY[0]+'</td><td>'+tableXY[1]+'</td><td>'+tableXY[2]+'</td>';
  table += '<td>'+tableXY[3]+'</td><td>'+tableXY[4]+'</td><td>'+tableXY[5]+'</td></tr><tr>';
  table += '<th>y</th><td> '+ select[0] +' </td><td> '+ select[1] +' </td><td> '+ select[2] +' </td>';
  table += '<td> '+ select[3] +' </td><td> '+ select[4] +' </td><td> '+ select[5] +' </td></tr></table><p></p>';
  return table;
}

funcs[2][2] = function (){
  var tableV = new Array(10);
  for (var k = 0; k < tableV.length; k++) {
    tableV[k] = new Array(10);
  }
  titulo(2,2);
  submete=8;
  pagina = 0;
  hide("materia");
  show("quizzes");
  var sol = [-1,-1,-1,-1];
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var canvas = '<canvas id="canvas' + i + '"  width="' + larg_canvas + '" height="'+ alt_canvas + '"></canvas>';
    var enunciado = document.getElementById("enunciado"+i);
    var neg = Math.floor((Math.random() *2) + 1);
    var xV = Math.floor((Math.random() *4) + 1);
    if(neg==1) xV = -xV;
    tableV[i][0] = xV-3;
    tableV[i][1] = xV-2;
    tableV[i][2] = xV-1;
    tableV[i][3] = xV;
    tableV[i][4] = xV+1;
    tableV[i][5] = xV+2;
    for(var j = 6;j<12;j++){
      var randomY = Math.floor((Math.random() *7) + 0);
      var negY = Math.floor(Math.random() * 2) + 1;
      if (negY==1) randomY = -randomY;
      tableV[i][j]=randomY;
    }
    enunciado.innerHTML = "Completa a tabela consoante os pontos no gráfico:<p></p>";
    enunciado.innerHTML += criaTabela2(i,tableV[i]) + canvas ;

    create_graf2(i,tableV[i]);
    clear_radio(i);
  }
}
