
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

module.exports = {
  f : function(i){
    var tableV = new Array(10);
    var neg = Math.floor((Math.random() *2) + 1);
    var xV = Math.floor((Math.random() *4) + 1);
    if(neg==1) xV = -xV;
    tableV[0] = xV-3;
    tableV[1] = xV-2;
    tableV[2] = xV-1;
    tableV[3] = xV;
    tableV[4] = xV+1;
    tableV[5] = xV+2;
    for(var j = 6;j<12;j++){
      var randomY = Math.floor((Math.random() *7) + 0);
      var negY = Math.floor(Math.random() * 2) + 1;
      if (negY==1) randomY = -randomY;
      tableV[j]=randomY;
    }
    var cs = '<canvas id="canvas' + i + '"  width="400" height="400"></canvas>';
    q = "Completa a tabela consoante os pontos no gráfico:<p></p>";
    q += criaTabela2(i,tableV);
    return {q:q, solution:1, cs:cs, exec:'create_graf2('+i+','+tableV+')'}
  }
};
