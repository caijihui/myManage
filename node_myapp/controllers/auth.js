var Config = require('../config/config');
//服务器的验证接口
var cdn_host = Config.cdn_host;
var host = Config.host;
var message = "";
const os = require('os');
var system = {cdn_host:cdn_host,host:host};

/**
 * 登录
 * @param req
 * @param res
 * @param next
 * */
exports.doLogin = function (req, res, next) {
    var userName = req.body.username;
    if (typeof userName !='undefined'){
        req.session.username = userName;
    }
    if (req.session && req.session.username){
        return res.render("site/index",{message:message,system:system})
    }else {
         return res.render("auth/login",{message:message,system:system});
    }
}
/**
 * 登录界面
 * @param req
 * @param res
 * @param next
 * */
exports.adminLogin = function (req, res, next) {

    return res.render("auth/login", {message:message,system:system});
}

/**
 * 登录校验
 * @param req
 * @param res
 * @param next
 * */
exports.adminAuth = function (req, res, next) {
  if(req.session && req.session.username)//如果已经有登录了 就继续下去
  {
    return res.send('登录成功！');
  }else {
    return res.redirect(302,'/login');
  }
}


/**
 * 登录校验
 * @param req
 * @param res
 * @param next
 * */
exports.getDoc = function (req, res, next) {
    if(req.session && req.session.username)//如果已经有登录了 就继续下去
    {
        //return res.render("../doc", {message:message,system:system});
        return res.redirect('../doc');
    }else {
        return res.redirect(302,'/login');
    }
}