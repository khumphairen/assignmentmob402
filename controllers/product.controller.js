// định nghĩa các controller
var ProductModel = require('../models/product.model');

exports.getListProduct = async (req,res,next)=>{
    // viết nội dung xử lý cho hàm
    var listProduct = await ProductModel.find();
    res.render('./product/list-product',{listProduct:listProduct});
}

// Thêm sản phẩm:
exports.getFormAddProduct = (req,res, next) => {
    res.render('./product/add-product');
}
exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const objProduct = new ProductModel(
        {
            nameProduct: req.body.product_name,
            priceProduct: Number(req.body.product_price),
            categoryProduct: req.body.product_category
        }
    );
    objProduct.save(function (err){
        if (err){
            console.log(err)
        } else {
            console.log("Ghi dữ liệu Product thành công")
        }
    })
    res.redirect('/product/');
}

// Xóa sản phẩm:
exports.getFormDeleteProduct = async (req, res, next)=>{
    console.log(req.params);
    let itemProduct = await ProductModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemProduct);
    if(itemProduct == null){
        res.send("Không tìm thấy bản ghi");
    }
    res.render("./product/delete-product",{itemProduct:itemProduct});
}
exports.postDeleteProduct = (req,res,next)=>{
    let dieu_kien = {
        _id: req.params.id // lấy id trên thanh địa chỉ
    }
    ProductModel.deleteOne(dieu_kien,function (err) {
        if (err){
            console.log(err);
        } else {
            console.log("xóa thành công");
        }
    });
    res.redirect('/product/');
}

// Sửa sản phẩm:
exports.getFormEditProduct = async (req, res, next)=>{
    console.log(req.params);
    let itemProduct = await ProductModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    if(itemProduct == null){
        res.send("Không tìm thấy bản ghi");
    }
    res.render('./product/edit-product',{itemProduct:itemProduct});
}
exports.postEditProduct = (req,res, next) =>{
    console.log(req.body);
    let dieu_kien = {
        _id: req.params.id
    }
    let du_lieu = {
        nameProduct: req.body.product_name,
        priceProduct: Number(req.body.product_price),
        categoryProduct: req.body.product_category
    }
    ProductModel.updateOne(dieu_kien,du_lieu,function (err, res){
        if(err){
            res.send("Lỗi cạp nhật" + err.message);
        }
    })
    res.redirect('/product/');
}

// xem chi tiết sản phẩm
exports.getProductDetail = async (req, res, next) => {
    //truy vấn db để dữ liệu user theo id
    let itemProduct = await ProductModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    res.render('./product/detail-product', {itemProduct: itemProduct});
}