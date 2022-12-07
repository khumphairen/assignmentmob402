const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@thuchanh01.oi9jvyn.mongodb.net/ren90s'); // Kết nối CSDL

const productSchema = new mongoose.Schema({nameProduct:'String',priceProduct:'Number',categoryProduct:'String'});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;