// định nghĩa các controller
var UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

// Lấy danh sách tài khoản
exports.getListUser = async (req,res,next)=>{
    var listUser = await UserModel.find();
    res.render('./user/list-user',{listUser:listUser});
}

// Thêm tài khoản:
exports.getFormAddUser = (req,res, next) => {
    res.render('./user/add-user');
}
exports.postAddUser = (req, res, next) => {
    console.log(req.body);
    const objUser = new UserModel(
        {
            username: req.body.username_user,
            password: req.body.password_user,
            email: req.body.email_user
        }
    );
    objUser.save(function (err){
        if (err){
            console.log(err)
        } else {
            console.log("Ghi dữ liệu User thành công")
        }
    })
    res.redirect('/user/');
}

// Sửa tài khoản
exports.getFormEditUser = async (req,res,next)=>{
    console.log(req.params);
    let itemUser = await UserModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err);
        });
    if(itemUser==null){
        res.send('Không tìm thấy bản ghi');
    }
    res.render('./user/edit-user',{itemUser:itemUser});
}
exports.postEditUser = (req, res, next)=>{
    console.log(req.body);
    let dieu_kien = {
        _id: req.params.id
    };
    let du_lieu = {
        username: req.body.username_user,
        password: req.body.password_user,
        email: req.body.email_user,
    }
    UserModel.updateOne(dieu_kien,du_lieu,function (err){
        if (err){
            res.send("Lỗi edit: "+err.message);
        }
    });
    res.redirect('/user/')
}

// Xóa tài khoản:
exports.getFormDeleteUser = async (req, res, next)=>{
    console.log(req.params);
    let itemUser = await UserModel.findById(req.params.id)
        .exec()
        .catch(function (err){
            console.log(err)
        });
    console.log(itemUser);
    if(itemUser == null){
        res.send("Không tìm thấy bản ghi");
    }
    res.render("./user/delete-user",{itemProduct:itemUser});
}
exports.postDeleteUser = (req,res,next)=>{
    let dieu_kien = {
        _id: req.params.id // lấy id trên thanh địa chỉ
    }
    UserModel.deleteOne(dieu_kien,function (err) {
        if (err){
            console.log(err);
        } else {
            console.log("xóa thành công");
        }
    });
    res.redirect('/user/');
}

// Xử lý Rigister
exports.showFormRegister = (req,res,next)=>{
    res.render('./user/register.hbs');
}
// có kết nối database => phải sử dụng async
exports.PostRegister = async (req,res,next)=>{
    console.log(req.body); // kiểm tra dữ liệu post
    // kiểm tra hợp lệ dữ liệu
    if(req.body.password_user1 != req.body.password_user2){
        // thoát luôn
        return res.render('./user/register', {msg:'<b>Xác nhận pass không đúng</b>'});
    }
    // Tiếp theo tạo password mã hóa bằng bcrypt.
    var chuoi_ngau_nhien = await bcrypt.genSalt(10);
    var my_passwd  = await bcrypt.hash(req.body.password_user1, chuoi_ngau_nhien );
    // tạo model để ghi vào csdl
    var objUser = {
        username: req.body.username_user,
        password: my_passwd, // pass đã mã hóa
        email: req.body.email_user
    };
    // ghi csdl
    await UserModel.create( objUser, function (err){
        // xử lý kết quả tạo user
        if(err){
            console.log(err);
            return res.render('./user/register', {msg:'<b>Lỗi đăng ký: </b>' + err.message});
        }
        // đến đây là không có lỗi
        console.log("Ghi CSDL thành công");
    });
    // chuyển hướng tới trang đăng nhập
    res.redirect('/user/login'); // chú ý không có dấu chấm ở trước /users
}

// Xử lý Login
exports.showFormLogin = (req,res,next)=>{
    res.render('./user/login.hbs')
}
exports.PostLogin = async (req,res,next)=>{
    console.log(req.body);
    var objUser = await UserModel.findOne({username: req.body.username_user});
    if(objUser){
        console.log(objUser);
        var checkPass = await bcrypt.compare(req.body.password_user, objUser.password);
        if (checkPass){
            // đúng pass, ghi vào session
            req.session.userLogin = objUser; // userLogin là tên thuộc tính tự đặt
            // chuyển trang về DS tài khoản hoặc trang chủ
            return res.redirect('/user')
        } else {
            // Sai pass
            res.render('./user/login',{msg:'<b>Sai pass</b>'});
        }
    } else {
        // Không tìm thấy User tức User = null
        return res.render('./user/login',{msg:'<b>Không tồn tại user</b>'});
    }
}
