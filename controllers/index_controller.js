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
        Category.find({ category_type: 'child' }).sort({ title: 'desc' }).exec(),
        Post.find().limit(psize).skip(skipTotal).populate('category').sort({ post_date: 'desc' }).exec(),//all post
        Post.find({ is_featureSlider: true }).limit(6).skip(skipTotal).populate('category').sort({ post_date: 'desc' }).exec(),//feature
        Post.find().limit(psize).skip(skipTotal).populate('category').sort({ post_date: 'desc' }).exec(),//newest post
        Post.find().limit(psize).skip(skipTotal).populate('category').sort({views: 'desc'}).exec()//viewest post
    ]).spread(
        function (categories, posts, featurePosts, newsetPost,viewest) {
            console.log(posts);
            res.render('index', {
                head: {
                    title: "Trang chủ",
                    meta_description: "STVonline - Đi Tìm Giá Trị Vĩnh Hằng. Qua những bài thu âm dựng thành clip, hy vọng rằng sẽ mang đến cho bạn những giây phút thư giản, bình yên.",
                    meta_keywords: "Stvonline, đi tìm giá trị vĩnh hằng, ý nghĩa cuộc sống, hành trình, trái tim, tâm hồn, bình an"
                },
                posts: posts,
                categories: categories,
                featurePosts: featurePosts,
                newsetPost: newsetPost,
                moment: moment,
                viewest: viewest
            });
        },
        function (error) {
            return next(err);
        }
        ).done();
};
exports.single_post = function (req, res, next) {
    var title_url = req.params.title_url;
    var cat_url = req.params.cat_url;
    var psize = myConfig.paging.pagesize;
    var skipTotal = req.body.pageIndex > 0 ? psize * (req.body.pageIndex - 1) : 0;

    Q.all([
        Category.find({ category_type: 'child' }).sort({ title: 'desc' }).exec(),
        Post.find().populate('category').limit(psize).skip(skipTotal).sort({ views: 'desc' }).exec(),
        Post.find().limit(psize).skip(skipTotal).sort({ views: 'desc' }).populate('category', null, { title_url: cat_url }).exec(),//viewest post
        Post.findOneAndUpdate({ title_url: title_url }, { $inc: { views: 1 } }).populate('category').exec(),//single post
        Post.find().limit(psize).skip(skipTotal).populate('category').sort({ post_date: 'desc' }).exec(),//newest post
        
    ]).spread(
        function (categories, viewestPost, relativePosts, post,newestPost) {
            var title  = description = keywords = '';
            if(post){
                title = post.title;
                description = post.meta_description;
                keywords = post.keywords;
            }
            res.render('single_post', {
                categories: categories,
                relativePosts: relativePosts,
                viewestPost: viewestPost,
                post: post,
                moment: moment,
                newestPost: newestPost,
                head: {
                    title: title,
                    meta_description: description,
                    meta_keywords: keywords
                },
            });
        },
        function (error) {
            return next(error);
        }
        ).done();
};
