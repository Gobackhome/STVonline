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
    var lists = require('../controllers/list_controller');
    var category = require('../controllers/category_controller');
    
    var res_head = {
        msg: "",
        head: {
            title: "Trang chủ",
            meta_description: "STVonline - Đi Tìm Giá Trị Vĩnh Hằng. Qua những bài thu âm dựng thành clip, hy vọng rằng sẽ mang đến cho bạn những giây phút thư giản, bình yên.",
            meta_keywords: "Stvonline, đi tìm giá trị vĩnh hằng, ý nghĩa cuộc sống, hành trình, trái tim, tâm hồn, bình an"
        }
    }
    app.use('/public', express.static('./public')).
        use('/models',express.static('./models')).
        use('/lib',express.static('../lib'));

    app.get('/',index.index);
    app.get('/account',users.getUser);
    app.get('/userarea',function(req,res){
        if(req.session.user){
            //res.render('user',{displayName: req.session.displayName, msg: req.session.msg});
            res.render('user',res_head);
        }else{
            req.session.msg = 'Access denied!';
            res.redirect('/user/login');
        }
    });
    app.post('/user',users.signup);
    app.get('/user/login',function(req,res){
        res.render('login',res_head);
    });
    app.post('/user/login',users.login);

    app.get('/posts',posts.getPosts);
    app.post('/posts',posts.addPost);
    app.delete('/posts/:id',posts.doDelete);
    app.post('/posts/feature',posts.getFeatureSlider);
    // app.get('/posts/menu',posts.menu);
    // app.get('/posts/viewestPost',posts.viewestPost);
    app.get('/single/:cat_url/:title_url',index.single_post);
    
    app.post('/upload',uploader.single('file'), posts.upload);
    //app.get('/post/tag/:title',posts.findOrCreateTag());
    app.get('/categories',posts.getCategories);
    app.post('/categories',posts.addCategory);

    app.get('/category/:title_url',category.getCategories);
    app.get('/list/:list_url',lists.getLists);
    //app.get('/single/:post_id',posts.getPost);
    //app.get('/posts/get',posts.getPosts);
    //app.get('/playlist/get',playlists.getPlaylists);
    //app.post('playlist/add',playlists.addPlaylist);
    //app.get('/users/get',users.getUser);
    //app.post('/user',users.savePost);
    //app.post('/users/update/playlist',users.updatePlaylist);

}