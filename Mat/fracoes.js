//funcoes para criar fracoes

module.exports = {
  start_frac : function (){
    var text = '<div class="divTable"><div class="divTableBody"><div class="divTableRow">';
    return text;
  },

  end_frac : function (){
    var text = '</div></div></div>';
    return text;
  },

  create_frac : function (num,denum){
    var text = '<div class="divTableCellp">(</div>';
    if (num<0 || denum<0) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
    text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ Math.abs(num) +'</div><div class="denum" id="denum1">'+ Math.abs(denum) +'</div></span></div>';
    text += '<div class="divTableCellp">)</div>';
    return text;
  },

  create_frac_pot : function (num,denum,pot){
    var text = '<div class="divTableCellp">(</div>';
    if(num<0 || denum<0) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
    text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ Math.abs(num) +'</div><div class="denum" id="denum1">'+ Math.abs(denum)  +'</div></span></div>';
    text += '<div class="divTableCellp">)</div><div id="cell2" class="divTableCelle"><sup><sup>'+pot+'</sup></sup></div>';
    return text;
  },

  create_frac_pot_pot : function (num,denum,pot1,pot2){
    var text = '<div class="divTableCellp">(</div>';
    text += '<div class="divTableCellp">(</div>';
    if(num<0 || denum<0) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
    text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ Math.abs(num) +'</div><div class="denum" id="denum1">'+ Math.abs(denum) +'</div></span></div>';
    text += '<div class="divTableCellp">)</div><div id="cell2" class="divTableCelle"><sup><sup>'+pot1+'</sup></sup></div>';
    text += '<div class="divTableCellp">)</div><div id="cell2" class="divTableCelle"><sup><sup>'+pot2+'</sup></sup></div>';
    return text;
  },

  create_custom_frac : function (str1,str2,sinal){
    var text = '<div class="divTableCellp">(</div>';
    if (sinal==1) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
    text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ str1 +'</div><div class="denum" id="denum1">'+ str2 +'</div></span></div>';
    text += '<div class="divTableCellp">)</div>';
    return text;
  },

  create_custom_frac_pot : function (str1,str2,pot,sinal){
    var text = '<div class="divTableCellp">(</div>';
    if (sinal==1) text += '<div id="cell2" class="divTableCelle"> -&nbsp;</div>';
    text += '<div id="cell2" class="divTableCell"><span class="frac"><div class="num" id="num1">'+ str1 +'</div><div class="denum" id="denum1">'+ str2 +'</div></span></div>';
    text += '<div class="divTableCellp">)</div><div id="cell2" class="divTableCelle"><sup><sup>'+pot+'</sup></sup></div>';
    return text;
  }
};
