module.exports = {

  buildPage : function(i,q,s1,s2,s3,s4){
    var str="";
    if(i>0) str = '<div class="pag'+i+'" id="pag'+i+'" style="display: none;">';
    else str = '<div class="pag'+i+'" id="pag'+i+'">';
    str+='<div class="pag'+i+'" id="enunciado'+i+'"><img src="" id="img'+i+'" width="500" />'+q+'</div>';
    str+='<div class="pag'+i+'" id="respostas'+i+'">';
    str+='<input type="radio" id="r0'+i+'" name="solucao'+i+'" value="0"><label id="label0'+i+'">'+s1+'</label><br>';
    str+='<input type="radio" id="r1'+i+'" name="solucao'+i+'" value="1"><label id="label1'+i+'">'+s2+'</label><br>';
    str+='<input type="radio" id="r2'+i+'" name="solucao'+i+'" value="2"><label id="label2'+i+'">'+s3+'</label><br>';
    str+='<input type="radio" id="r3'+i+'" name="solucao'+i+'" value="3"><label id="label3'+i+'">'+s4+'</label><br>';
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
