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

       var menuList = '<li><a href="#"><i class="fa fa-home"></i> ' +
            '<span class="nav-label">平台管理 </span>' +
            '<span class="fa arrow"></span></a>' +
            '<ul class="nav nav-second-level">' +
            '<li><a class="J_menuItem" href="/admin/channel/investList">做单记录</a></li></ul></li><l">';
       var account = {
            name:'admin',
            role:'超级管理员'
        };
        return res.render("layout",{page:'site/index',menu:menuList, system:system,account:account});
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
      return next();
      // return res.send('登录成功！');
  }else {
    return res.redirect(302,'/login');
  }
}


/**
 * 退出
 * @param req
 * @param res
 * @param next
 * */
exports.doLogout = function (req, res, next) {
    delete req.session.userid;
    message = "";
    return res.render("auth/login", {message:message,system:system});
}

exports.doIndex = function (req, res, next) {
    return res.render('site/index');
}