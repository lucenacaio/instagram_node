const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', unique: true, index: true },
    post_picture: {
        img_name: String,
        img_url: String
    },
    comments: [{
        user: { type: Schema.ObjectId, ref: 'User', unique: true, index: true },
        comment: String,
        timestamp: { type: Date, default: Date.now }
    }],
    status: String
});

module.exports = function() {
    return PostSchema;
}