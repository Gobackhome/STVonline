/**
 * Created by Binh Yen on 7/9/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    findOrCreate = require('mongoose-findorcreate');


var ReplySchema = new Schema({
    display_name: {type: String, default: ''},
    subject: {type: String, default: ''},
    timestamp: {type: Date, default: Date.now},
    body: {type: String, default: ''},
    post:  { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    //replies: [ReplySchema]
}, {_id: true});
mongoose.model('Reply', ReplySchema);

var CommentThreadSchema = new Schema({
    title: {type: String, default: ''},
    replies: [ReplySchema]
});
mongoose.model('CommentThread', CommentThreadSchema);

var TagSchema = new Schema({
    title: {type: String, default: ''},
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});
TagSchema.plugin(findOrCreate);
mongoose.model('Tag',TagSchema);

var ImageSchema = new Schema({
    title: String,
    file_name: String,
    timestamp: {type: Date, default: Date.now}
}, {_id: false});
mongoose.model("Image",ImageSchema);

var CategorySchema = new Schema({
    title: {type: String},
    description : {type: String, default: ''},
    preview_image: {type: String, default: ''},
    create_date: {type: Date,default: Date.now},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});
CategorySchema.plugin(findOrCreate);
mongoose.model('Category', CategorySchema);

var PostSchema = new Schema({
    title:  {type: String, default: '',unique:true},
    title_url: {type: String, default: ''},
    description : {type: String, default: ''},
    post_type: {type: String, default: ''},
    is_featureSlider: {type: Boolean, default: false},
    video_url : {type: String, default: ''},
    preview_image: {type: String, default: ''},
    thumbnail_image: {type: String, default: ''},
    meta_title: {type: String, default: ''},
    meta_description: {type: String, default: ''},
    meta_keywords: {type: String, default: ''},
    category : { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tag:  [{type: String}],
    post_date:{type: Date, default: Date.now},
    is_active: {type: Boolean, default: false},
    comments:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: {type: Number, default: 0},
    views: {type: Number, default: 0}
});
PostSchema.methods.makeLike = function(cb) {
    this.like += 1;
    this.save(cb);
};
mongoose.model('Post', PostSchema);

//
//var PlaylistSchema = new Schema({
//    title: String,
//    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
//    user_id: String
//});
//PlaylistSchema.plugin(findOrCreate);
//mongoose.model('Playlist',PlaylistSchema);

