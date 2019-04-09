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
 * 增加投资记录
 * @param req
 * @param res
 * @param next
 */
function addInvest(req,res,next) {
    var postData=req.body || {};
    var nowMoment=new moment();
    var data={
        plat_from:postData['plat_from'],
        invest_phone:postData['invest_phone'],
        invest_name:postData['invest_name'],
        invest_money:postData['invest_money'],
        invest_rewords:postData['invest_rewords'],
        invest_start:postData['invest_start'],
        invest_end:postData['invest_end'],
        from_to:postData['from_to'],
        status:1,
        create_time:nowMoment.format('YYYY-MM-DD HH:mm:ss')
    }
    DaoFactory.getInvestRecordDao().insertData(data,function (err,investData) {
        if (err){
            return next(err);
        }else {
            return res.send({isSuccess:true});
        }
    });
}

/**
 * 修改投资记录
 * @param req
 * @param res
 * @param next
 */
function editInvestRecord(req, res, next) {
    var  postData = req.body;
    var  nowMoment=new moment();
    if (typeof postData['strJson'] != 'undefined') {
        postData = postData['strJson'];
        postData = JSON.parse(postData);
    }
    var data={
        plat_from:postData['plat_from'],
        invest_phone:postData['invest_phone'],
        invest_name:postData['invest_name'],
        invest_money:postData['invest_money'],
        invest_rewords:postData['invest_rewords'],
        invest_start:postData['invest_start'],
        invest_end:postData['invest_end'],
        from_to:postData['from_to'],
        status:1,
        update_time:nowMoment.format('YYYY-MM-DD HH:mm:ss')
    }
    DaoFactory.getInvestRecordDao().updateData({id:postData['id']},data, function (err, data) {
        if(err){
            return next(err);
        }else {
            return res.send({isSuccess:true});
        }
    });
}

/**
 * 获取投资记录列表
 * @param req
 * @param res
 * @param next
 * */
function getInvestRecordList(req, res, next) {
    DaoFactory.getInvestRecordDao().getList(null, function (err, InvestRecordList) {
        if(err){
            return next(err);
        }else{
            return res.send(InvestRecordList);
        }
    });
}

module.exports = {
    getInvestRecordList:getInvestRecordList,
    addInvest:addInvest,
    editInvestRecord:editInvestRecord
}