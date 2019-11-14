function customSolutions(i){
  var str='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0" onclick="change_radio(this,'+i+')"><label id="label0'+i+'"><</label><br>';
  str+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1" onclick="change_radio(this,'+i+')"><label id="label1'+i+'">></label><br>';
  str+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2" onclick="change_radio(this,'+i+')"><label id="label2'+i+'">=</label><br>';
  return str;
}

const f = require('./../fracoes');
module.exports = {
  f : function(i){
    var a, b, sc;
    a = Math.floor((Math.random() *8) + 2);
    b = Math.floor((Math.random() *8) + 2);
    if ((a/b)>Math.round(a/b)) sc=">";
    else if ((a/b)<Math.round(a/b)) sc="<";
    else if ((a/b)==Math.round(a/b)) sc="=";
    q=f.start_frac() + f.create_frac(a,b);
    q+='<div id="cell2'+i+'" class="divTableCell">&nbsp;?&nbsp;</div>';
    q+='<div class="divTableCell">' + (Math.round(a/b))+ '</div>';
    q+=f.end_frac()
    var cs = customSolutions(i);
    return {q:q, s1:0, s2:0, s3:0, s4:0, solution:sc, cs:cs}
  }
};
