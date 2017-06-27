var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('passportapp', ['users']);
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//login page - GET
router.get('/login', function(req, res){
  res.render('login');
});


//REGISTER PAGE - GET
router.get('/register', function(req, res){
  res.render('register');
});

//register post
router.post('/register', function(req, res){
  //get form values
  var name                  =req.body.name;
  var email                 =req.body.email;
  var username              =req.body.username;
  var password              =req.body.password;
  var password2             =req.body.password2;

//validation
  req.checkbody('name', 'Name field is required').notEmpty();
  req.checkbody('email', 'Email field is required').notEmpty();
  req.checkbody('email', 'Please use a valid email address').notEmpty();
  req.checkbody('username', 'User Name field is required').notEmpty();
  req.checkbody('password', 'Password field is required').notEmpty();
  req.checkbody('password2', 'Passwords do not match').equals(req.body.password);

//check for errors
  var errors = req.ValidationErrors();

  if(errors){
    console.log('form has errors...');
    res.render('register',{
      errors: errors,
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  }else{
    console.log('success');
  }

});

module.exports = router;
