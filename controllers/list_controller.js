var mongoose = require('mongoose'),
moment = require('moment'),
    Post = mongoose.model('Post'),
    Tag = mongoose.model('Tag'),
    Category = mongoose.model('Category');
var S = require('string');
var myConfig = require('../config/myconfig');
var Q = require('q');

exports.getLists = function (req, res, next) {
    var psize = myConfig.paging.pagesize;
    var skipTotal = req.body.pageIndex > 0 ? psize * (req.body.pageIndex - 1) : 0;
    var cat_url = req.params.list_url;
    Q.all([
        Category.find({ category_type: 'child' }).sort({ title: 'desc' }).exec(),
        Post.find().limit(psize).skip(skipTotal).sort({ post_date: 'desc' }).populate('category', null, { title_url: cat_url }).exec(),
        Post.find().limit(psize).skip(skipTotal).sort({ views: 'desc' }).populate('category',null, { title_url: cat_url }).exec(),
        Post.find().limit(psize).skip(skipTotal).sort({ post_date: 'desc' }).populate('category').exec(),
        Post.findRandom().limit(psize).populate('category').exec(),
        Post.find().limit(psize).skip(skipTotal).sort({post_date: 'desc'}).populate('category').exec()

    ]).spread(
        function (categories,  posts, viewestPosts,randomPosts,newestPosts) {
            res.render('list', {
                categories: categories,
                viewestPosts: viewestPosts,
                posts: posts,
                randomPosts: randomPosts,
                newestPosts: newestPosts,
                moment : moment,
                head: {
                    title: "Menu",
                    meta_description: "STVonline - Đi Tìm Giá Trị Vĩnh Hằng. Qua những bài thu âm dựng thành clip, hy vọng rằng sẽ mang đến cho bạn những giây phút thư giản, bình yên.",
                    meta_keywords: "Stvonline, đi tìm giá trị vĩnh hằng, ý nghĩa cuộc sống, hành trình, trái tim, tâm hồn, bình an"
                },
            });
        },
        function (error) {
            return next(err);
        }
        ).done();
};