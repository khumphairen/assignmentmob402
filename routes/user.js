var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller');
var autheM = require('../middleware/auth.middleware')

/* GET users listing. */
router.get('/',autheM.yeuCauDangNhap, userController.getListUser);



// xóa
router.get('/delete/:id',userController.getFormDeleteUser);
router.post('/delete/:id',userController.postDeleteUser);

// sửa
router.get('/edit/:id',userController.getFormEditUser);
router.post('/edit/:id',userController.postEditUser);

// Đăng kí
router.get('/register',autheM.khongYeuCauDangNhap, userController.showFormRegister);
router.post('/register',autheM.khongYeuCauDangNhap, userController.PostRegister);

// Đăng nhập
router.get('/login',autheM.khongYeuCauDangNhap, userController.showFormLogin);
router.post('/login',autheM.khongYeuCauDangNhap, userController.PostLogin);

module.exports = router;
