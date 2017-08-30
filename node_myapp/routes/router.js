 const AuthContr = require('../controllers').authController;
module.exports  = function(app) {

    app.get(['/','/login'], AuthContr.adminLogin);                                                                     //登录界面跳转
    app.post('/login', AuthContr.doLogin);                                                                             //登录校验
    app.get('/doc', AuthContr.getDoc);                                                                             //登录校验
   // app.post('/api/get/List', AuthContr.adminAuth, ApiChannel.getList);

}
