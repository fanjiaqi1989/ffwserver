var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//login
router.post('/login', function (req, res, next) {
  var u = req.body.u;
  var p = req.body.p;
  var t = req.body.t;
  console.log('req.body', req.body);
  var result = {};
  result.cmd = "cmd_login";
  result.result = 0;
  result.msg = "登录成功！";
  result.u = u;
  result.t = t;
  result.k = 19891019;

  User.checkUserLogin(u, p, t, function (err, row) {
    if (err) {
      result.result = -1;
      result.msg = err;
    }
    if (!row) {
      result.result = -1;
      result.msg = 'cant find user';
    } else {
      result.result = 1;
      result.msg = 'login success';
      result.k = "";//此处进行token生成，建立用户与token关系，用于以后接口的校验
    }
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
