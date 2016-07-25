var mongoose = require('mongoose'),
    moment = require('moment'),
    Post = mongoose.model('Post'),
    Tag = mongoose.model('Tag'),
    Category = mongoose.model('Category');
var S = require('string');
var myConfig = require('../config/myconfig');
var Q = require('q');

exports.getCategories = function (req, res, next) {
    var psize = myConfig.paging.pagesize;
    var skipTotal = req.body.pageIndex > 0 ? psize * (req.body.pageIndex - 1) : 0;

    Q.all([
        Category.find({ category_type: 'child' }).sort({ title: 'desc' }).exec(),
        Post.find({ is_featureSlider: true }).limit(6).skip(skipTotal).populate('category').sort({ post_date: 'desc' }).exec(),//feature
        Post.find().limit(psize).skip(skipTotal).populate('category').sort({ post_date: 'desc' }).exec(),//newest post
        Post.find().limit(psize).skip(skipTotal).populate('category').sort({views: 'desc'}).exec(),//viewest post
        Post.findRandom().limit(psize).populate('category').exec()
    ]).spread(
        function (categories,  featurePosts, newsetPosts,viewestPosts,randomPosts) {
            res.render('index', {
                head: {
                    title: "Trang chủ",
                    meta_description: "STVonline - Đi Tìm Giá Trị Vĩnh Hằng. Qua những bài thu âm dựng thành clip, hy vọng rằng sẽ mang đến cho bạn những giây phút thư giản, bình yên.",
                    meta_keywords: "Stvonline, đi tìm giá trị vĩnh hằng, ý nghĩa cuộc sống, hành trình, trái tim, tâm hồn, bình an"
                },
                categories: categories,
                featurePosts: featurePosts,
                newsestPosts: newsetPosts,
                moment: moment,
                viewestPosts: viewestPosts,
                randomPosts: randomPosts
            });
        },
        function (error) {
            return next(err);
        }
        ).done();
};