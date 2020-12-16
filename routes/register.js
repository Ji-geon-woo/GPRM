var express = require('express');
var router = express.Router();
var model = require('../models/usersDAO');

router.get('/register', (req, res) => res.render('register', {errors: []}))
// 로그인 처리
router.post('/register', (req, res)=> {
  const { ID, role, name, PW1, PW2 } = req.body
  let errors = []

  if (!ID || !role || !name || !PW1 || !PW2) {
    errors.push({message :'Please enter all fields.'})
  }
  if (PW1 != PW2) {
    errors.push({message : 'Password is not match.'})
  }
  if (PW1 < 6){
    errors.push({message : 'Password is must be at least 6 characters.'})
  }

  if (errors.length > 0){
    res.render('register', { errors: errors, ID: '', name: '', role: '', PW1: '', PW2: ''})
  } else {
    model.selectUser(req.body.ID, (results)=>{
      try {
        if(req.body.ID === results[0].ID) {
          errors.push({message : 'ID already exists.'})
          res.render('register', { errors, ID, name, role, PW1, PW2})
        }
      } catch (e) {
        model.insertUser(req.body, ()=>{
          res.redirect('/login')
        })
      }
    });
  }
})
module.exports = router;