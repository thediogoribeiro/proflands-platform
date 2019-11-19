
function criaTabela(tableXY){
  var table = '<table style="width:400px"><tr>';
  table += '<th>x</th><td>'+tableXY[0]+'</td><td>'+tableXY[1]+'</td><td>'+tableXY[2]+'</td>';
  table += '<td>'+tableXY[3]+'</td><td>'+tableXY[4]+'</td><td>'+tableXY[5]+'</td></tr><tr>';
  table += '<th>y</th><td>'+tableXY[6]+'</td><td>'+tableXY[7]+'</td><td>'+tableXY[8]+'</td>';
  table += '<td>'+tableXY[9]+'</td><td>'+tableXY[10]+'</td><td>'+tableXY[11]+'</td></tr></table>';
  return table;
}

module.exports = {
  f : function(i){
    var neg1, neg2, xV, y, q;
    var tableV = new Array(10);
    for (var k = 0; k < tableV.length; k++) {
      tableV[k] = new Array(10);
    }
    neg1 = Math.floor((Math.random() *2) + 1);
    xV = Math.floor((Math.random() *5) + 1);
    if(neg1==1) xV = -xV;
    tableV[i][0] = xV-3;
    tableV[i][1] = xV-2;
    tableV[i][2] = xV-1;
    tableV[i][3] = xV;
    tableV[i][4] = xV+1;
    tableV[i][5] = xV+2;
    for(var j = 6;j<12;j++){
      neg2 = Math.floor((Math.random() *2) + 1);
      y = Math.floor((Math.random() *6) + 1);
      if(neg2==1) y = -y;
      tableV[i][j]=y;
    }
    q = criaTabela(tableV[i]);
    q += "Apresenta os valores de y no grafico:<br>";
    var cs = '<canvas id="canvas' + i + '"  width="400" height="400"></canvas>';
    return {q:q, solution:1, cs:cs, exec:'create_graf('+i+','+tableV[i]+')'}
  }
};
