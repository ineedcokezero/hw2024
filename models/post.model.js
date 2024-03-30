let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//post schema
let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    bank: String,
    imageURL: String
});

let Post = mongoose.model('Post', postSchema);

module.exports = {
    Post: Post
}