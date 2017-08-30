/**
 * Created by cjh on 2017/6/14.
 */
var Config = require('../../config/config');
var DaoFactory = require('../../proxy');
var cdn_host = Config.cdn_host;
var host = Config.host;
var moment = require('moment');
var Logger = require('../../lib/logger');
var common = require('../../lib/common');
var xlsx = require('node-xlsx');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
let Async = require('async');


/**
 * 根据userid获得admin
 * @param req
 * @param res
 * @param next
 * */
function getAdminUserByUserId(req, res, next) {
  var admin_id = req.body;
  if(typeof admin_id['AdminID'] != 'undefined'){
    DaoFactory.getAdminUserDao().getData({admin_id:admin_id['AdminID']}, function (err, admin) {
      if(err){
        return next(err);
      }else{
        return res.send(admin);
      }
    });
  }else{
    //如果没有传参数，则返回全部列表
    DaoFactory.getAdminUserDao().getList(null, function (err, adminList) {
      if(err){
        return next(err);
      }else{
        for(var i=0;i<adminList.length;i++){
          adminList[i]['password'] = "";
          adminList[i]['salt'] = "";
        }
        return res.send(adminList);
      }
    });
  }

}


module.exports = {
  getAdminUserByUserId:getAdminUserByUserId,
}