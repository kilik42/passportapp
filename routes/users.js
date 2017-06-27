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
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Please use a valid email address').notEmpty();
  req.checkBody('username', 'User Name field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

//check for errors
  var errors = req.validationErrors();

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
    var newUser = {
      name: name,
      email: email,
      username: username,
      password: password
    }

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        newUser.password = hash;
        db.users.insert(newUser, function(err, doc){
            if(err){
              res.send(err);
            }else{
              console.log('user added...');

              //success messages
              req.flash('success', 'you are registered and can now log in');

              //redirect after register
              res.location('/');
              res.redirect('/');
            }
        });
      });
    });


  }

});

module.exports = router;
