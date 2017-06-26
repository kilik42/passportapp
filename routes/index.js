var express = require('express');
var router = express.Router();


//login page - GET
router.get('/', function(req, res){
  res.send('Index');
});





module.exports = router;
