
function criaTabela(tableXY){
  var table = '<table style="width:400px"><tr>';
  table += '<th>x</th><td>'+tableXY[0]+'</td><td>'+tableXY[1]+'</td><td>'+tableXY[2]+'</td>';
  table += '<td>'+tableXY[3]+'</td><td>'+tableXY[4]+'</td><td>'+tableXY[5]+'</td></tr><tr>';
  table += '<th>y</th><td>'+tableXY[6]+'</td><td>'+tableXY[7]+'</td><td>'+tableXY[8]+'</td>';
  table += '<td>'+tableXY[9]+'</td><td>'+tableXY[10]+'</td><td>'+tableXY[11]+'</td></tr></table>';
  return table;
}

funcs[2][1] = function (){
  var tableV = new Array(10);
  for (var k = 0; k < tableV.length; k++) {
    tableV[k] = new Array(10);
  }
  titulo(2,1);
  submete=7;
  pagina = 0;
  hide("materia");
  show("quizzes");
  var sol = [-1,-1,-1,-1];
  for (var i = 0; i < 10; i++) {
    cria_pag(i);
    var canvas = '<canvas id="canvas' + i + '"  width="' + larg_canvas + '" height="'+ alt_canvas + '"></canvas>';
    var enunciado = document.getElementById("enunciado"+i);
    var neg = Math.floor((Math.random() *2) + 1);
    var xV = Math.floor((Math.random() *5) + 1);
    if(neg==1) xV = -xV;
    tableV[i][0] = xV-3;
    tableV[i][1] = xV-2;
    tableV[i][2] = xV-1;
    tableV[i][3] = xV;
    tableV[i][4] = xV+1;
    tableV[i][5] = xV+2;
    for(var j = 6;j<12;j++){
      var neg = Math.floor((Math.random() *2) + 1);
      var y = Math.floor((Math.random() *6) + 1);
      if(neg==1) y = -y;
      tableV[i][j]=y;
    }
    enunciado.innerHTML = criaTabela(tableV[i]);
    enunciado.innerHTML += "Apresenta os valores de y no grafico:<br>" + canvas ;
    create_graf(i,tableV[i]);
    clear_radio(i);
  }
}
