var mongoose = require('mongoose'),
moment = require('moment'),
    Post = mongoose.model('Post'),
    Tag = mongoose.model('Tag'),
    Category = mongoose.model('Category');
var S = require('string');
var myConfig = require('../config/myconfig');
var Q = require('q');


exports.index = function (req, res, next) {
    var psize = myConfig.paging.pagesize;
    var skipTotal = req.body.pageIndex > 0 ? psize * (req.body.pageIndex - 1) : 0;

    Q.all([
        Category.find().exec(),
        Post.find().limit(psize).skip(skipTotal).sort({ post_date: 'desc' }).exec(),
        Post.find({ is_featureSlider: true }).limit(6).skip(skipTotal).sort({ post_date: 'desc' }).exec(),
        Post.find().limit(psize).skip(skipTotal).sort({ post_date: 'desc' }).exec(),
        
    ]).spread(
        function (categories, posts, featurePosts,newsetPost) {
            res.render('index', {
                posts: posts,
                categories: categories,
                featurePosts: featurePosts,
                newsetPost: newsetPost,
                moment : moment
            });
        },
        function (error) {
            return next(err);
        }
        ).done();
};
exports.single_post = function (req, res, next) {
    var id = req.params.id;
   
    Post.findById(id).exec(function (err, post) {
        if (err) {
            return next(err);
        }
        post.views++;
        post.save(function (err, post) {
            if (err) {
                return next(err);
            }
            return res.render('single_post', {
                post: post,
                moment: moment
            });
        });

    });
};
