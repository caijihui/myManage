var Base = require("../proxy/base");

var AdminUser = require("../proxy/admin_user");
var PlatFrom = require("../proxy/platFrom");
var invest_record = require("../proxy/invest_record");

var _instances = {};
exports.getDao = function(table) {
    return new Base(table);
}
exports.getAdminUserDao = function(){
    if(typeof _instances['AdminUser'] === 'undefined'){
        _instances['AdminUser'] = new AdminUser();
    }
    return  _instances['AdminUser'];
}
exports.getPlatFromDao=function () {
    if (typeof _instances['PlatFrom'] ==='undefined'){
        _instances['PlatFrom']=new PlatFrom();
    }
    return _instances['PlatFrom'];
}
exports.getInvestRecordDao=function () {
    if (typeof _instances['invest_record'] ==='undefined'){
        _instances['invest_record']=new invest_record();
    }
    return _instances['invest_record'];
}