var fs=require('fs');
var querystring=require('querystring');
var db=require('./dbhelper');

function User(){
	this.username;
	this.password;
}

module.exports=User;

User.checkUserLogin=function(username,password,type,callback){
	var sql="";
	if(type==0){
		//游客登陆，没有密码
		sql = "select * from t_user where username='"+username+"' and type="+type;
	}else{
		//用户名密码登陆
		sql = "select * from t_user where username='"+username+"' and password='"+password+"' and type="+type;
	}
	db.exec(sql,'',function(err,rows){
		if(err){
			return callback(err);
		}
		//rows是一个对象数组
		callback(err,rows[0]);
	});
};
