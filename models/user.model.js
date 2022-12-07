const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@thuchanh01.oi9jvyn.mongodb.net/ren90s');

const userSchema = new mongoose.Schema({username:'String',password:'String',email:'String'});

const User = mongoose.model('User',userSchema);

module.exports = User;

// module.exports = mongoose.model('tb_user',userSchema)