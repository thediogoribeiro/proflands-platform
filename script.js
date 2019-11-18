
const f = require('./Mat/fracoes');
module.exports = {
  buildPage : function(i,q,cs){
    var str="";
    if(i>0) str = '<div class="pag'+i+'" id="pag'+i+'" style="display: none;">';
    else str = '<div class="pag'+i+'" id="pag'+i+'">';
    str+='<img src="" id="img'+i+'" width="500" />';
    str+='<div class="pag'+i+'" id="enunciado'+i+'">'+q+'</div>';
    str+='<div class="pag'+i+'" id="respostas'+i+'">'+cs+'</div>';
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
