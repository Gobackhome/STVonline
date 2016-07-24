/**
 * Created by Binh Yen on 7/12/2016.
 */
var mongoose = require('mongoose'),
    User  = mongoose.model('User'),
    Post = mongoose.model('Post'),
    randomstring = require("randomstring");
var crypto = require('crypto');

function hashPW(pwd, passwordSalt){
    return crypto.createHash('sha256').update(pwd + passwordSalt)
        .digest('base64').toString();
}

exports.getUser = function(req,res){
    User.find()
        .exec(function(err,user){
            if(!user){
                res.json(404, {msg: "User Not Found."});
            }else{
                res.json(user);
            }
        });
};
exports.updatePlaylist = function(req,res){
    User.update({userid: 'viewerA'},{$set: {playlist: req.body.updatedPlaylist}})
        .exec(function(err,results){
            if(err|| results < 1){
                res.json(404, {msg: "Failed to update Playlist"});
            }else{
                res.json({msg: "User Playlist Updated."});
            }
        });
};

exports.savePost = function(req,res){
    var title = req.body.title;
    console.log(req.body);
    res.json(title);
};

exports.signup = function(req,res){
    var user;
    user = new User({email: req.body.email, passwordSalt: randomstring.generate()});
    user.set('hashed_password',hashPW(req.body.password,user.passwordSalt));
    user.set('displayName',req.body.displayName);
    user.save(function(err){
        if (err){
            //res.session.error = err;
            //res.redirect('/signup');
            res.json(404, {msg: "Failed to signup."});
        }else{
            req.session.user = user.id;
            req.session.displayName = user.displayName;
            req.session.email = user.email;
            req.session.msg = "Authenticated as "+ user.displayName;
            //res.redirect('/');
            res.json(201, {msg: "Success"});
        }
    })
};
exports.login = function(req,res){
    User.findOne({email:req.body.email})
        .exec(function(err,user){
            if(!user){
                err = "User Not Found.";
            }else if(user.hashed_password === hashPW(req.body.password.toString(),user.passwordSalt)){
                req.session.regenerate(function(){
                    req.session.user = user.id;
                    req.session.email = user.email;
                    req.session.msg = "Authenticated as "+ user.displayName;
                    //res.json(201, {msg: "Success"});

                    res.redirect('/userarea');
                   
                });
            }else{
                err = 'Authentication failed.';
            }
            if(err){
                req.session.regenerate(function(){
                    req.session.msg = err;
                    
                    //res.json(201, {msg: "Failure"});
                    //res.redirect('/user/login',{msg: "Login Failure. Check email/password again."});
                    res.render('/user/login',{
                                msg: "",
                                head: {
                                        title: "Trang chủ",
                                        meta_description: "STVonline - Đi Tìm Giá Trị Vĩnh Hằng. Qua những bài thu âm dựng thành clip, hy vọng rằng sẽ mang đến cho bạn những giây phút thư giản, bình yên.",
                                        meta_keywords: "Stvonline, đi tìm giá trị vĩnh hằng, ý nghĩa cuộc sống, hành trình, trái tim, tâm hồn, bình an"
                                    },
                            })
                })

            }
        })
};
