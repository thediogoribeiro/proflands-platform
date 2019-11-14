
const f = require('./Mat/fracoes');
module.exports = {
  buildPage : function(i,q,s1,s2,s3,s4,type){
    var str="";
    if(i>0) str = '<div class="pag'+i+'" id="pag'+i+'" style="display: none;">';
    else str = '<div class="pag'+i+'" id="pag'+i+'">';
    str+='<img src="" id="img'+i+'" width="500" />';
    if(type==1){
      str+='<div class="pag'+i+'" id="enunciado'+i+'">'+q+'</div>';
      str+='<div class="pag'+i+'" id="respostas'+i+'">';
      str+='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+s1+'</label><br>';
      str+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+s2+'</label><br>';
      str+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+s3+'</label><br>';
      str+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+s4+'</label><br>';
    }else if(type==2){
      str+='<div class="pag'+i+'" id="enunciado'+i+'">'+ fVSu(q.a,q.b) +'</div>';
      str+='<div class="pag'+i+'" id="respostas'+i+'">';
      str+='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0" onclick="change_radio(this,'+i+')"><label id="label0'+i+'"><</label><br>';
      str+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1" onclick="change_radio(this,'+i+')"><label id="label1'+i+'">></label><br>';
      str+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2" onclick="change_radio(this,'+i+')"><label id="label2'+i+'">=</label><br>';
    }else if(type==3){
      str+='<div class="pag'+i+'" id="enunciado'+i+'">'+q+'</div>';
      str+='<div class="pag'+i+'" id="respostas'+i+'">';
      str+=areaColTable(i,s3,s4);
    }
    str+='</div></div>';
    return str;
  },

  variacao : function(valor, iVar){
    var variacao = Math.floor(Math.random() * iVar) + 1;
    var pos = Math.floor(Math.random() * 2) + 1;
    if (pos==1) variacao = -variacao;
    valor +=variacao;
    return valor;
  }

};

function fVSu(a,b){
  str=f.start_frac() + f.create_frac(a,b);
  str+='<div id="cell2'+i+'" class="divTableCell">&nbsp;?&nbsp;</div>';
  str+='<div class="divTableCell">' + (Math.round(a/b))+ '</div>';
  str+=f.end_frac()
  return str;
}

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
