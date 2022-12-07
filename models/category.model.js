const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@thuchanh01.oi9jvyn.mongodb.net/ren90s');

const categorySchema = new mongoose.Schema({nameCategory:'String',maCategory:'String'});

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;