const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var PostSchema = new Schema({
    name: String,
    password: String,
    username: { type: String, lowercase: true, index: true, unique: true },
    email: String,
    profile_image: {
        img_name: String,
        img_url: String
    }
});

module.exports = function() {
    return PostSchema;
}