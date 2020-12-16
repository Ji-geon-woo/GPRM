var express = require('express');
var model = require('../models/usersDAO')
var router = express.Router();

router.get('/login', (req, res) => res.render('login'));

router.post('/login', (req, res)=>{
  if (req.body.ID && req.body.PW){
    model.selectUser(req.body.ID, (results)=>{
      try {
        if(req.body.ID === results[0].ID && req.body.PW === results[0].PW){
          res.render('mainpage', {username: req.body.ID, isLogin: true});
        }
      } catch(e) {
        res.render('login', {ID: '', PW: ''})
      }
    });
  }else{
    console.log(res.body.ID, res.body.PW)
    res.redirect('/');
  }
})

router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err)
        console.log(`req.session.destroy error : ${err}`);
    else
      res.redirect('/');
  });
})
module.exports = router;