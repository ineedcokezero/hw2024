let Post = require('../models/post.model').Post;
let uniqid = require('uniqid');//npm i uniqid to have unique id number for each post
let path = require('path'); // fix the \ and / stuff
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');
//app has multiple routes, get, post, delete and update


router.get('/', async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})

router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})

router.post('/', authMiddleware, async (req, resp) => {
    let reqBody = req.body;
    let imgPath; //create a var to rep both imageURL or the path for imageFile
    if(reqBody.imageURL) {
        imgPath = reqBody.imageURL;
    } else {
        imgPath = req.file.path.substring(req.file.path.indexOf(path.sep),req.file.path.length);
    }
    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        bank: reqBody.bank,
        imageURL: imgPath
    })
    await newPost.save(); // add data to database

    resp.send('Created');
})

//remove a post by id
router.delete('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Deleted');
})

router.put('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Update');
})


module.exports = router;