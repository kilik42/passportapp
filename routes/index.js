var express = require('express');
var router = express.Router();


//login page - GET
router.get('/', function(req, res){
  res.render('index');
});





module.exports = router;
