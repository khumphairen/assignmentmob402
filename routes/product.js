var express = require('express');
var router = express.Router();

const productController = require('../controllers/product.controller');

/* GET product listing. */
router.get('/', productController.getListProduct);

// thêm
router.get('/add',productController.getFormAddProduct);
router.post('/add',productController.postAddProduct);

// xóa
router.get('/delete/:id',productController.getFormDeleteProduct);
router.post('/delete/:id',productController.postDeleteProduct);

// sửa
router.get('/edit/:id',productController.getFormEditProduct);
router.post('/edit/:id',productController.postEditProduct);

// chi tiết
router.get('/detail/:id', productController.getProductDetail);

module.exports = router;

