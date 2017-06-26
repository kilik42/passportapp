var express = require('express');
var router = express.Router();


//login page - GET
router.get('/login', function(req, res){
  res.render('login');
});


//REGISTER PAGE - GET
router.get('/register', function(req, res){
  res.render('register');
});


module.exports = router;
