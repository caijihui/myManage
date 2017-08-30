var config = require('../config/config');
var logger = require('./logger');
var redis = require('redis');
var client = redis.createClient(config.redis.options);
var isOnline = 1;
var defaultTTL = config.redis.ttl;
var namespace = config.redis.namespace||'';
var separate = config.redis.separate||'';

client.on('ready', function(err){
  if(err) return logger.log('error', 'redis ready error',err);
  logger.log('info', 'redis ready');
  isOnline = 1;
  /*    client.auth(config.redis.auth,function(err,ok){
   if(err) return logger.log('error', 'redis auth error',err);
   isOnline = 1;
   logger.log('info', 'redis auth ok');
   });*/
})
client.on('error', function(err){//断开连接抛这个错误
  if(err)  logger.log('error', 'catch redis error',err);
  isOnline=0;
})
client.on('reconnecting', function(err){
  if(err&&err.attempt==5){//重试次数{ delay: 200, attempt: 1 }
    //alarmServer.redisDown();//报警服务发送报警
  }
})
client.on('end', function(err){
  if(err)  console.log(err);
  console.log('end');
})
client.on('warning', function(err){
  if(err)  console.log(err);
  console.log('warning');
})
client.on('connect', function(err){
  if(err)  console.log(err);
})
exports.isOnline = function() {
  return isOnline;
}
exports.client = client;

/**
 * 获取缓存的key
 * @param cacheKey
 */
function getKey(cacheKey) {
  return namespace+separate+cacheKey;
}
exports.getKey = getKey;
/**
 * 设置
 * @param cacheKey
 * @param ttl
 */
exports.get = function (cacheKey,callback) {
  client.get(getKey(cacheKey),function(err,reply) {
    if (err) {
      return callback(err)
    }

    try{
      var ret =JSON.parse(reply)
    } catch (e) {
      return callback(new Error('json parse error '))
    }
    callback(null,ret);
  });
}
/**
 * 设置值
 * @param cacheKey
 * @param value
 * @param callback
 * @param ttl
 */
exports.set = function (cacheKey,value,callback,ttl) {
  if(typeof ttl == 'undefined')
  {
    ttl = defaultTTL;
  }
  client.setex(getKey(cacheKey), ttl, JSON.stringify(value),function(err, back){//设置过期时间(秒)和值
    if(err) return callback(err);
    callback(null,back);
  })
}

exports.del = function (cacheKey,callback) {
  client.del(getKey(cacheKey), function (err, back) {
    if(err) return callback(cacheKey)
    callback(null, back)
  })
}

