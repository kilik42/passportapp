var express = require('express');
var router = express.Router();


//login page - GET
router.get('/login', function(req, res){
  res.send('login');
});


//REGISTER PAGE - GET
router.get('/register', function(req, res){
  res.send('register');
});


module.exports = router;
