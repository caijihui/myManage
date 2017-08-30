var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');//对favicon的处理
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/router');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('./config/config');
var app = express();
var logger = require('./lib/logger');//自己的日志
let CommonFun = require('./lib/common')

//app.set('env', config.env);//设置运行环境
// view engine setup 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(config.states_path));//静态文件
var multer  = require('multer');
app.use(multer().any());//使用这个不错
app.use(bodyParser.urlencoded({ extended: true ,limit:2*1024*1024}));//这个就支持了了application/x-www-form-urlencoded  extented 为true 支持数组?
app.use(bodyParser.json());//默认json  默认支持application/json
app.use(bodyParser.text({type: 'text/*'}));//默认json  默认支持application/json
app.use(bodyParser.text({type: 'application/xml'}));//默认json  默认支持application/json
app.use(express.static(path.join(__dirname, 'public')));//静态文件路径

app.use(cookieParser());
app.use(session({
  name: config.session.cookie_name,
  secret: 'test', // 这个是必须的字段 秘密 建议使用 128 个字符的随机字符串 cookie 签名字符 难道不用浏览器的头作为签名的值?
  cookie: { maxAge: config.session.cookie.max_age  ,httpOnly:false, domain: config.session.domain},//maxAge 就是有效期redis
  resave: true,
  saveUninitialized: false,
  store: new RedisStore({
    prefix:config.session.prefix,
    host:config.session.store.host,
    pass:config.session.store.password,
    port:config.session.store.port,
    ttl:config.session.store.ttl
  })
})); // TODO session 的使用可以配置路由来使用 ? 这里是全部请求都启用session
app.use(function(req, res, next) {
  try {
    var headers = req.headers;
    headers['url'] = req.url;
    headers['ip'] = CommonFun.getClientIP(req);
    //logger.log('info',headers);
  }catch (err){
  }
  next();
});
routes(app);

// catch 404 and forward to error handler
//调用next() 就会执行下面 如果已经res.send 则会报错
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

  app.use(function(err, req, res, next) {
    console.log('baseUrl',req.baseUrl,'path',req.path)
    res.status(err.status || 500);
    if(err.isJson) {

      logger.log('info','product error',err.error_code,err.message);
      res.send({
        error_code:err.error_code,
        message:err.message,
      })
    }else {
      logger.log('info','product error',err);
      res.render('error', {
        message: err.message,
        error: {}
      });
    }
  });
module.exports = app;
