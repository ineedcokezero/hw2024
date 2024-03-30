let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer'); //npm i multer to install package
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/postroute');
let emailsRouter = require('./routes/emailroute');
let usersRouter = require('./routes/userroute');
let Post = require('./models/post.model').Post;
let auth = require('./controllers/auth');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/Project_HW');
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null,'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

app.use(multer({storage: imageStorage}).single('imageFile')); // added local pic uploaded to public/images

app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts',postsRouter);
app.use('/emails',emailsRouter);
app.use('/users',usersRouter);

app.get('/dd', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('dd', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
});


app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }
    
})

app.get('/login', (req, resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        resp.redirect('/admin');
    } else {
        resp.render('login');
    }
})

app.listen(3000, () => console.log('go to http://localhost:3000/.'));