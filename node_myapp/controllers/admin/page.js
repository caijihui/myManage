/**
 * Created by cjh on 2017/6/14.
 */
var DaoFactory = require('../../proxy');
var Config = require('../../config/config');
var cdn_host = Config.cdn_host;
var host = Config.host;
var system = {cdn_host:cdn_host, host:host};
let Async = require('async');

/**
 * 系统配置
 * @param req
 * @param res
 * @param next
 * */
function toSystem(req, res, next) {
  return res.render('site/admin/system',{system:system});
}

module.exports = {
    toSystem:toSystem,
}