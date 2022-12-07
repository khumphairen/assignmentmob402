// định nghĩa các controller
var CategoryModel = require('../models/category.model');
const ProductModel = require("../models/product.model");

exports.getListCategory = async (req,res,next)=>{
    // viết nội dung xử lý cho hàm
    var listCategory = await CategoryModel.find();
    res.render('./category/list-category',{listCategory:listCategory});
}

// Thêm sản phẩm
exports.getFormAddCategory = (req,res, next) => {
    res.render('./category/add-category');
}

exports.postAddCategory = (req, res, next) => {
    console.log(req.body);
    const objCategory = new CategoryModel(
        {
            nameCategory: req.body.category_name,
            maCategory: req.body.category_ma
        }
    );
    objCategory.save(function (err){
        if (err){
            console.log(err)
        } else {
            console.log("Ghi dữ liệu Category thành công")
        }
    })
    res.redirect('/category/');
}

// Xóa thể loại:
exports.getFormDeleteCategory = async (req, res, next)=>{
    console.log(req.params);
    let itemCategory = await CategoryModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemCategory);
    if(itemCategory == null){
        res.send("Không tìm thấy bản ghi");
    }
    res.render("./category/delete-category",{itemCategory:itemCategory});
}
exports.postDeleteCategory = (req,res,next)=>{
    let dieu_kien = {
        _id: req.params.id // lấy id trên thanh địa chỉ
    }
    CategoryModel.deleteOne(dieu_kien,function (err) {
        if (err){
            console.log(err);
        } else {
            console.log("xóa thành công");
        }
    });
    res.redirect('/category/');
}

// Sửa sản phẩm:
exports.getFormEditCategory = async (req, res, next)=>{
    console.log(req.params);
    let itemCategory = await CategoryModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    if(itemCategory == null){
        res.send("Không tìm thấy bản ghi");
    }
    res.render('./category/edit-category',{itemCategory:itemCategory});
}
exports.postEditCategory = (req,res, next) =>{
    console.log(req.body);
    let dieu_kien = {
        _id: req.params.id
    }
    let du_lieu = {
        nameCategory: req.body.category_name,
        maCategory: req.body.category_ma,
    }
    CategoryModel.updateOne(dieu_kien,du_lieu,function (err, res){
        if(err){
            res.send("Lỗi cạp nhật" + err.message);
        }
    })
    res.redirect('/category/');
}