exports.yeuCauDangNhap = (req,res,next)=>{
    if(req.session.userLogin){
        // có tồn tại thông tin đăng nhập
        next();
    }else{
        res.redirect('/user/login');
    }
}

exports.khongYeuCauDangNhap = (req,res,next)=>{
    if(!req.session.userLogin){
        next();//vd: vào trang đăng ký, đăng nhập
    }else{
        res.redirect('/user');
    }
}
