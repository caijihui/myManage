var Base = require("./base");
var util = require("util");
//考虑分库分表的实现这里
function platfrom() {
    //Base.call(this);
    this.table = 'platfrom';
}
util.inherits(platfrom, Base); //继承base原型方法
module.exports = platfrom;