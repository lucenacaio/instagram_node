const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Objectid = Schema.Types.ObjectId;


var UserSchema = new Schema({
    name: String,
    password: String,
    username: { type: String, lowercase: true, index: true, unique: true },
    email: String,
    profile_image: {
        img_name: String,
        img_url: String
    },
    followers: [{
        _id: Objectid,
        username: String,
        name: String,
        profile_picture: String
    }],
    following: [{
        _id: Objectid,
        username: String,
        name: String,
        profile_picture: String
    }]
});

module.exports = function() {
    return UserSchema;
}