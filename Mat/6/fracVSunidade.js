
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
    var str='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0" onclick="change_radio(this,'+i+')"><label id="label0'+i+'"><</label><br>';
    str+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1" onclick="change_radio(this,'+i+')"><label id="label1'+i+'">></label><br>';
    str+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2" onclick="change_radio(this,'+i+')"><label id="label2'+i+'">=</label><br>';
    return {q:q, solution:sc, cs:str}
  }
};
