/**
 * Created by Binh Yen on 7/9/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoleSchema = new Schema({
    title: String,
},{_id: false});
mongoose.model('Role',RoleSchema);

var UserSchema = new Schema({
    displayName: String,
    email: {type: String, unique: true},
    passwordSalt : String,
    hashed_password: String,
    roles: [RoleSchema]
});
mongoose.model('User',UserSchema);

