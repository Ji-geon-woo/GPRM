var express = require('express');
var router = express.Router();

// 로그인 처리
router.post('/login', (req, res)=>{
  if (req.body.id && req.body.pwd){
    model.selectUser(req.body.id, (results)=>{
      if(req.body.id === results[0].id && req.body.password1 === results[0].password1){
        req.session.isLogin = true;
        res.redirect('/');
      }else{
        res.redirect('/login');
      }
    });
  }else{
    res.redirect('/');
  }
})

router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err)
        console.log(`req.session.destroy error : ${err}`);
    res.redirect('/');
  });
})

module.exports = router;