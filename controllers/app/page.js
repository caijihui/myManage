/**
 * Created by cjh on 2017/6/14.
 */
var DaoFactory = require('../../proxy');
var Config = require('../../config/config');
var cdn_host = Config.cdn_host;
var host = Config.host;
var system = {cdn_host:cdn_host, host:host};
let Async = require('async');



function setConfig(req,res,next) {
    return res.render('site/app/set',{system:system});
}

/**
 * 做单记录
 * @param req
 * @param res
 * @param next
 * */
function toInvestList(req, res, next) {
    // var admin_id = req.session.userid;
    var admin_id = 1;
    DaoFactory.getPlatFromDao().getList(null, function (err, platfromList) {
        if(err){
            return next(err);
        }else{
            system = {
                cdn_host:cdn_host,
                host:host,
                admin_id:admin_id,
                platfromList:platfromList
            };
            return res.render('site/admin/investList',{system:system});
        }
    })
}

module.exports = {
    setConfig:setConfig,
    toInvestList:toInvestList
}