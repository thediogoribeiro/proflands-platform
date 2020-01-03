const f = require('./../fracoes');

function areaColTable(pag,denum1,denum2){
  text = '<div><table id="tabela_cores' + pag + '" style="width:500px; height:500px" >';
  for(var i = 0; i < denum1; i++){
    text += "<tr>";
    for(var j = 0; j < denum2; j++){
      text += '<td id="' + i + ':' + j + '" onclick="changeColor(this)"></td>';
    }
    text += "</tr>";
  }
  text += '</table></div>';
  return text;
}

module.exports = {
  f : function(i){
    var num1, num2, denum1, denum2;
    num1 = Math.floor(Math.random() * 9) + 1;
    denum1 = Math.floor(Math.random() * (10-num1)) + (num1+1);
    num2 = Math.floor(Math.random() * 9) + 1;
    denum2 = Math.floor(Math.random() * (10-num2)) + (num2+1);
    var op = '<div id="cell2" class="divTableCell"> &times; </div>';
    q = f.start_frac() + f.create_frac(num1,denum1) + op + f.create_frac(num2,denum2) + f.end_frac();
    sc=num1*num2;
    var cs = areaColTable(i,denum1,denum2);
    return {q:q, solution:sc, cs:cs}
  }
};
