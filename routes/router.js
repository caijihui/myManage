 const AuthContr = require('../controllers').authController;
 const App = require('../controllers').AppController;
 const ApiApp= require('../controllers').apiAppController;
module.exports  = function(app) {

    app.get(['/','/login'], AuthContr.adminLogin);                                                                //登录界面跳转
    app.post('/login', AuthContr.doLogin);                                                                        //登录校验
    app.get('/logout', AuthContr.doLogout);                                                                            //退出
    app.get('/site/index', AuthContr.adminAuth, AuthContr.doIndex);                                                    //跳转index子页面

    app.get('/app/set', App.setConfig);                                                                           //设置信息页面

    // 例子
    app.get('/admin/channel/investList', AuthContr.adminAuth, App.toInvestList);                                 //跳转做单记录
    app.post('/api/get/allInvestRecord', AuthContr.adminAuth, ApiApp.getInvestRecordList);                         //投资列表
    app.post('/api/add/invest', AuthContr.adminAuth, ApiApp.addInvest);                                           //添加投资记录
    app.post('/api/edit/editInvestRecord', AuthContr.adminAuth, ApiApp.editInvestRecord);                         //编辑投资记录
}
