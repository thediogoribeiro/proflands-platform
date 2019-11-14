
const f = require('./../fracoes');
module.exports = {
  f : function(){
    var num1, num2, denum1, denum2, n1, n2, m1, m2, dif, sinal1, sinal2, forMax;
    var sol = [-1,-1,-1,-1];
    num1 = Math.floor(Math.random() * 9) + 1;
    denum1 = Math.floor(Math.random() * 9) + 2;
    num2 = Math.floor(Math.random() * 9) + 1;
    denum2 = Math.floor(Math.random() * 9) + 2;
    n1 = Math.floor(Math.random() * 5) + 2;
    m1 = Math.floor(Math.random() * 5) + 2;
    n2 = Math.floor(Math.random() * 5) + 2;
    m2 = Math.floor(Math.random() * 5) + 2;
    dif = Math.floor(Math.random() * 2) + 1;
    sinal1 = Math.floor(Math.random() * 2) + 1;
    sinal2 = Math.floor(Math.random() * 2) + 1;
    if (sinal1==1)num1=-num1;
    if (sinal2==1)num2=-num2;
    var op_mult = '<div id="cell2" class="divTableCell">&nbsp;&times;&nbsp;</div>';
    if(dif==1){
      q = f.start_frac() + f.create_frac_pot_pot(num1,denum1,n1,m1) + f.end_frac();
      if (n1*m1%2==0 || n1+m1%2==0) num1=Math.abs(num1);
      sol[0] =  f.start_frac() +  f.create_frac_pot(num1,denum1,n1+m1) + f.end_frac();
      sol[1] =  f.start_frac() +  f.create_frac_pot(denum1,num1,n1*m1) + f.end_frac();
      sol[2] =  f.start_frac() +  f.create_frac_pot(denum1,num1,n1+m1) + f.end_frac();
      sol[3] =  f.start_frac() +  f.create_frac_pot(num1,denum1,n1*m1) + f.end_frac();
    }else{
      q = f.start_frac() + f.create_frac_pot_pot(num1,denum1,n1,m1) + op_mult + f.create_frac_pot_pot(num2,denum2,n2,m2) + f.end_frac();
      if (n1*m1%2==0 || n1+m1%2==0) num1=Math.abs(num1);
      if (n2*m2%2==0 || n2+m2%2==0) num1=Math.abs(num2);
      sol[0] = f.start_frac() + f.create_frac_pot(num1,denum1,n1+m1) + op_mult + f.create_frac_pot(num2,denum2,n2+m2) + f.end_frac();
      sol[1] = f.start_frac() + f.create_frac_pot(denum1,num1,n1*m1) + op_mult + f.create_frac_pot(denum2,num2,n2*m2) + f.end_frac();
      sol[2] = f.start_frac() + f.create_frac_pot(denum1,num1,n1+m1) + op_mult + f.create_frac_pot(denum2,num2,n2+m2) + f.end_frac();
      sol[3] = f.start_frac() + f.create_frac_pot(num1,denum1,n1*m1) + op_mult + f.create_frac_pot(num2,denum2,n2*m2) + f.end_frac();
    }
    var sc = sol[3];
    var s = [-1,-1,-1,-1];
    for(var i = 0; i<4 ; i++){
      var rand = Math.floor(Math.random() * (4-i));
      s[i] = sol[rand];
      sol.splice(rand, 1);
    }
    return {q:q, s1:s[0], s2:s[1], s3:s[2], s4:s[3], solution:sc}
  }
};
