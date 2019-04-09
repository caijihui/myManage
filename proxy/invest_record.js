var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function invest_record() {
    //Base.call(this);
    this.table = 'invest_record';
}
util.inherits(invest_record, Base); //继承base原型方法
module.exports = invest_record;