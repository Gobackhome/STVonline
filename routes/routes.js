/**
 * Created by Binh Yen on 7/12/2016.
 */
var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        var fileName = file.originalname;
        var lastDotIndex = fileName.lastIndexOf('.');
        var name = fileName.substring(0, lastDotIndex);
        var extension = fileName.substring(lastDotIndex + 1, fileName.length);
        cb(null, name + '-' + Date.now() + '.' + extension);
    }
});
var uploader = multer({storage: storage});


module.exports = function(app){
    var users = require('../controllers/users_controller');
    var posts = require('../controllers/posts_controller');
    var playlists = require('../controllers/playlists_controller');
    var index = require('../controllers/index_controller');

    app.use('/public', express.static('./public')).
        use('/models',express.static('./models')).
        use('/lib',express.static('../lib'));

    app.get('/',index.index);
    app.get('/account',users.getUser);
    app.get('/userarea',function(req,res){
        if(req.session.user){
            //res.render('user',{displayName: req.session.displayName, msg: req.session.msg});
            res.render('user');
        }else{
            req.session.msg = 'Access denied!';
            res.redirect('/user/login');
        }
    });
    app.post('/user',users.signup);
    app.get('/user/login',function(req,res){
        res.render('login',{msg: ""})
    });
    app.post('/user/login',users.login);

    app.get('/posts',posts.getPosts);
    app.post('/posts',posts.addPost);
    app.post('/upload',uploader.single('file'), posts.upload);
    //app.get('/post/tag/:title',posts.findOrCreateTag());
    app.get('/categories',posts.getCategories);
    app.post('/categories',posts.addCategory);
    //app.get('/single/:post_id',posts.getPost);
    //app.get('/posts/get',posts.getPosts);
    //app.get('/playlist/get',playlists.getPlaylists);
    //app.post('playlist/add',playlists.addPlaylist);
    //app.get('/users/get',users.getUser);
    //app.post('/user',users.savePost);
    //app.post('/users/update/playlist',users.updatePlaylist);

}