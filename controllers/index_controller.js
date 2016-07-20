var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Tag = mongoose.model('Tag'),
    Category = mongoose.model('Category');
var S = require('string');
var myConfig = require('../config/myconfig');



exports.index = function (req, res,next) {
    var psize = myConfig.paging.pagesize;
    var skipTotal = req.body.pageIndex > 0 ? psize * (req.body.pageIndex - 1) : 0;
    var posts = Post.find()
        .limit(psize)
        .skip(skipTotal)
        .sort({
            post_date: 'desc'
        })
        .exec(function (err, posts) {
            if (err) {
                return next(err);
            }
            //return posts;
        });
    var categories = Category.find()
        .exec(function (err, categories) {   if (err) {
                return next(err);
            }
           // return categories 
        });


    res.render('index', {posts :posts,
        categories : categories});
};