let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//post schema
let userSchema = new Schema({
    email: String,
    password: String
});

let User = mongoose.model('User', userSchema, 'users');

module.exports = {
    User
}