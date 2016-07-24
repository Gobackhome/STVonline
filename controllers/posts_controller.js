/**
 * Created by Binh Yen on 7/12/2016.
 */
var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Tag = mongoose.model('Tag'),
    Category = mongoose.model('Category'),
    randomstring = require("randomstring");



var S = require('string');
var myConfig = require('../config/myconfig');

function changeAlias(alias) {
    var str = S(alias);
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");
    //cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
}
function stringToArray(str) {
    var myStr = S(str);
    var arr = myStr.split(',');
    return arr;
}
function findTags(titletags, savePost) {
    var res = { tag: [] };
    var strs = S(titletags);
    var strArr = strs.split(',');
    for (var i = 0; i < strArr.length; i++) {

        Tag.findOrCreate({ 'title': strArr[i] }, function (err, tag, created) {
            if (tag) {
                savePost(tag);
            } else if (err) {
            } else {
            }
        })
    }
    return res;
}
//
//exports.getPost = function(req,res){
//    Post.findOne({_id: req.query.post_id})
//        .exec(function(err,post){
//        if(!post){
//            res.json(404,{msg: "Post Not Found."});
//        }else{
//            res.json(post);
//        }
//    });
//};
exports.getPost = function (req, res) {
    Post.findOne({ _id: req.body.post_id })
        .populate('category')
        .exec(function (err, post) {
            if (!post) {
                res.render('404');
            } else {
                res.render('single_post', post);
            }
        });
};
exports.getPosts = function (req, res) {
    var psize = myConfig.paging.pagesize;
    Post.find()
        .limit(psize)
        .skip(psize * (req.body.pageIndex - 1))
        .sort({
            post_date: 'desc'
        })
        .exec(function (err, posts) {
            if (!posts) {
                res.json(404, { msg: 'Post Not Found.' });
            } else {

                res.json(posts);
            }
        });
};
exports.getFeatureSlider = function (req, res, next) {
    Post.find({ is_featureSlider: true })
        .sort({
            post_date: 'desc'
        })
        .exec(function (err, posts) {
            if (!posts) {
                res.json(404, { msg: 'Post Not Found.' });
            } else {
                res.json(posts);
            }
        });
}

// exports.addPost = function (req, res,next) {
//     var post;
//     post = new Post(req.body.post);
//     console.log(post);
//     post.set('title_url',changeAlias(req.body.post.title));
//     findTags(req.body.post.tags,function(tag){
//         post.tag.push(tag);
//         post.save(function (err,post) {
//             if (err) {
//                 next(err);
//             } else {
//                 tag.post.push(post);
//                 tag.save(function(err,tag){
//                     if(err){
//                         next(err);
//                     }
//                 });
//             }
//         });
//     });
//     res.json(201,{post: post,msg: 'Add post successful.'});
// };
exports.doDelete = function (req, res, next) {
    console.log("dodelete");
    console.log(req);
    Post.remove({ _id: req.body._id }, function (err) {
        if (!err) {
            res.json(201, { msg: "Delete post successful." })
        } else {
            res.json(404, { msg: "Delete post failure." })
        }
    })
}
exports.addPost = function (req, res, next) {
    var post;
    post = new Post(req.body.post);
    console.log(req.body.post);
    console.log('add post');
    post.set('title_url', changeAlias(req.body.post.title));
    post.set('tag', stringToArray(req.body.tags));
    var options = {
        new: false,
        upsert: true,
        setDefaultsOnInsert: true
    };
    Post.update({ _id: post._id }, post, options, function (err, result) {
        if (err) {
            res.json(404, { msg: "Update post failure." });
        } else {
            res.json(201, { post: result, msg: 'Add post successful.' });
        }
    });
};


exports.upload = function (req, res, next) {
    return res.status(200).send(req.file);
}
exports.getCategories = function (req, res) {
    Category.find()
        .exec(function (err, categories) {
            if (err) {
                res.json(404, { msg: 'Category Not Found.' });
            } else {
                res.json(201, { msg: 'Success', categories: categories });
            }
        })
};
exports.addCategory = function (req, res) {
    Category.findOrCreate({ 
        title: req.body.title, 
        description: req.body.description, 
        category_type: req.body.category_type ,
        title_url: randomstring.generate(7),
        preview_image: req.body.preview_image
    }, function (err, cat, created) {
        if (cat) {
            res.json(201, { msg: "Add category successful.", category: cat });
        } else {
            res.json(401, { msg: 'Error 404' });
        }
    })
};
