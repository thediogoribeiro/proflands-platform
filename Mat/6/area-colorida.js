const f = require('./../fracoes');

module.exports = {
  f : function(){
    var num1, num2, denum1, denum2;
    num1 = Math.floor(Math.random() * 9) + 1;
    denum1 = Math.floor(Math.random() * (10-num1)) + (num1+1);
    num2 = Math.floor(Math.random() * 9) + 1;
    denum2 = Math.floor(Math.random() * (10-num2)) + (num2+1);

    var op = '<div id="cell2" class="divTableCell"> &times; </div>';
    q = f.start_frac() + f.create_frac(num1,denum1) + op + f.create_frac(num2,denum2) + f.end_frac();
    sc=num1*num2;
    return {q:q, s1:0, s2:0, s3:denum1, s4:denum2, solution:sc}
  }
};
