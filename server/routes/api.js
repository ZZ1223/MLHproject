var express = require('express');
var router = express.Router();
var user = require("../module/user.js");

/* GET home page. */
router.post('/login', function(req, res, next) {
    user.find({
      username:req.body.username,
      password:req.body.password
    },function(error,info){
      if(!error){
        if(info.length===0){
          res.send({result:false,message:"用户名或者密码错误"});
        }else{
          req.session.userlogin=info[0];
          res.send({result:true,message:"登陆成功"});
        }
      }
    })
});

router.post('/register', function(req, res, next) {
  console.log(req.body)
  user.find({username:req.body.username},function(error,info){
      if(info.length==0){
        user.create({
          username:req.body.username,
          password:req.body.password
        },function(error,info){
          if(!error){
            res.send({result:true,message:"注册成功"})
          }
        })
      }
      else{
        res.send({result:false,message:"用户名已存在"});
      }
  })
});

router.get('/wode',function(req,res,next){
  res.send(req.session.userlogin)
})

router.get('/unlog',function(req,res,next){
  req.session.userlogin="";
  res.send({result:true,message:"退出成功"})
})

module.exports = router;
