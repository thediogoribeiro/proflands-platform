const f = require('./../fracoes');

module.exports = {
  f : function(){
    var num1, num2, denum1, denum2, n, m, dif;
    var sol = [-1,-1,-1,-1];
    num1 = Math.floor(Math.random() * 9) + 1;
    denum1 = Math.floor(Math.random() * 9) + 2;
    num2 = Math.floor(Math.random() * 9) + 1;
    denum2 = Math.floor(Math.random() * 9) + 2;
    n = Math.floor(Math.random() * 5) + 2;
    m = Math.floor(Math.random() * 5) + 2;
    dif = Math.floor(Math.random() * 2) + 1;

    var frac1 = f.create_frac(num1,denum1);
    var frac2 = f.create_frac(num2,denum2);
    var op_mult = '<div id="cell2" class="divTableCell">&nbsp;&times;&nbsp;</div>'
    f.start_frac();
    var q = "";
    if(dif==1){
      for(var j = 0; j<n; j++){
        q += (j==0)?(""+ frac1):(op_mult+ frac1) ;
      }
      f.end_frac();
      sol[0] = f.start_frac() + f.create_frac((num1*n),denum1)+ f.end_frac() ;
      sol[1] = f.start_frac() + f.create_frac_pot((num1*n),denum1,n)+ f.end_frac() ;
      sol[2] = f.start_frac() + f.create_frac_pot((num1+num1),denum1,n)+ f.end_frac() ;
      sol[3] = f.start_frac() + f.create_frac_pot(num1,denum1,n)+ f.end_frac();
    }else{
      for(var j = 0; j<n; j++){
        q += (j==0)?(""+ frac1):(op_mult+ frac1) ;
      }
      for(var j = 0; j<m; j++){
        q += op_mult + frac2;
      }
      f.end_frac();
      sol[0] = f.start_frac() + f.create_frac((num1*n),denum1)+op_mult+f.create_frac((num2*m),denum2)+ f.end_frac();
      sol[1] = f.start_frac() + f.create_frac_pot((num1*n),denum1,n)+op_mult+f.create_frac_pot((num2*m),denum2,m)+ f.end_frac();
      sol[2] = f.start_frac() + f.create_frac_pot((num1+num1),denum1,n)+op_mult+f.create_frac_pot((num2+num2),denum2,m)+ f.end_frac();
      sol[3] = f.start_frac() + f.create_frac_pot(num1,denum1,n)+op_mult+f.create_frac_pot(num2,denum2,m)+ f.end_frac();
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
