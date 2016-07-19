///**
// * Created by Binh Yen on 7/12/2016.
// */
//var mongoose = require('mongoose'),
//    User = mongoose.model('User'),
//    Playlist = mongoose.model('Playlist');
//
//exports.getPlaylist = function (req, res) {
//    Playlist.findOne({_id: req.query.playlistId})
//        .exec(function (err, playlist) {
//            if (!playlist) {
//                res.json(404, {msg:"Playlist Not Found."});
//            } else {
//                res.json(playlist);
//            }
//        });
//};
//
//exports.getPlaylists = function(req,res){
//    Playlist.find({user_id: 'viewerA'})
//        .exec(function(err,playlists){
//            if(!playlists){
//                res.json(404, {msg: "Playlists Not Found."});
//            }else{
//                res.json(playlists);
//            }
//        });
//};
//
//exports.addPlaylist = function(req,res){
//    var title = req.body.title;
//    var playlist_posts =  req.body.posts;
//    var new_playlist = new Playlist({title: title, user_id: 'viewerA', post:playlist_posts });
//    new_playlist.save(function(err,results){
//        if(err){
//            res.json(500,"Failed to save Playlist");
//        }else{
//            User.update({userid:'viewerA'},
//                {$set:{playlist: []}})
//                .exec(function(err,results){
//                    if(err || results < 1){
//                        res.json(404,{msg: "Failed to update Playlist."});
//                    }else{
//                        res.json({msg: "Playlist Saved."});
//                    }
//                });
//        }
//    });
//};