var Base = require("../proxy/base");

var AdminUser = require("../proxy/admin_user");

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