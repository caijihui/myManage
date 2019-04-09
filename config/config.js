var path = require('path');
var config = {
  port: 5567,
  env:'development',
  name:'test',
  host:'http://127.0.0.1:5567',
  cdn_host:'http://127.0.0.1:5567',
  mysql: {
    connectionLimit: 10,
    host:'127.0.0.1',
    user: 'root',
    dateStrings: true, // 解决日期格式化问题
    password: 'root',
    database: 'my_third',
    charset: 'utf8mb4'
  },
  redis: { // 数据存储的配置
    options:{
      host : "127.0.0.1",
      port : 6379
    },
    ttl:3600,
    namespace:'test',
    separate:':'
  },
  session: { // 网页登录会话的配置
    cookie_name: 'test',
    prefix: 'test:session:',
    store:{
      host : "127.0.0.1",
      port : 6379,
      ttl:24*60*60,
    },
    cookie:{
      max_age: 24*60*60*1000
    }
  },
  logger: { // 可能还需要配置一个支付的日志
    warn_path :path.join(__dirname,'../logs/warn_error.log'),
    info_path :path.join(__dirname,'../logs/info.log'),
    error_path :path.join(__dirname,'../logs/error.log'),
  },
  match_type: {
    default: 0,
    match: 1,
    preg: 2
  },
  states_path:path.join(__dirname, '../public'),//静态文件存储地址
}

module.exports = config;

