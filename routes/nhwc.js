var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET nhwc listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource nhwc');
});

router.get('/test', function(req, res, next) {
    var param1 = req.query.param1;
    var result = {};
    result.id = 123;
    result.gid = param1;
    result.uid = 444;

    res.send('respond with a resource nhwc:'+JSON.stringify(result));
});

router.post('/test', function(req, res, next) {

    var result = {};
    result.username = req.body.un;
    result.psw = req.body.psw;

    res.send('respond with a resource nhwc:'+JSON.stringify(result));
});

//用户登陆
router.post('/login', function(req, res, next) {
    var u = req.body.u;
    var p = req.body.p;
    var t = req.body.t;

    var result = {};
    result.cmd = "login.php";
    result.result = 0;
    result.msg = "登录成功！";
	result.u = $username;
	result.t = t;
	result.k = 19891019;

    User.checkUserLogin(u,p,t,function(err,row){
        if(err){
            result.result = -1;
            result.msg = err;
        }
        if(!row){
            result.result = -1;
            result.msg = 'cant find user';
        }else{
            result.result = 1;
            result.msg = 'login success';
            result.k = "";//此处进行token生成，建立用户与token关系，用于以后接口的校验
        }
        res.send(JSON.stringify(result));
    });
    
});

module.exports = router;