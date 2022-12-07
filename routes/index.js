var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller');
var autheM = require('../middleware/auth.middleware')

/* GET home page. */
router.get('/',autheM.yeuCauDangNhap, function(req, res, next) {
  res.render('index',{ title: 'Express' });
});

module.exports = router;
