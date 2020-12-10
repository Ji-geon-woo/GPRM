var express = require('express');
var router = express.Router();
var model = require('../models/usersDAO');

// 로그인 처리
router.post('/register', (req, res)=> {
  const { id, role, password1, password2 } = req.body
  let errors = []

  if (!id || !role || !password1 || !password2) {
    errors.push({massage : 'Please enter all fields.'})
  }
  if (password1 != password2) {
    errors.push({massage : 'Passwords is not match.'})
  }
  if (password1 < 6){
    errors.push({massage : 'Password is must be at least 6 characters.'})
  }

  if (errors.length > 0){
    res.render('register', { errors, id, role, password1, password2})
  } else {
    model.selectUser(req.body.id, (results)=>{
      if(req.body.id === results[0].id) {
        errors.push({massage : 'ID already exists.'})
        res.render('register', { errors, id, role, password1, password2})
      } else {
        model.insertUser(req.body.id, req.body.role, req.body.password1)
      }
    });
  }
})

module.exports = router;