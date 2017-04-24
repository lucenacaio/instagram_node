const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    post_picture: {
        img_name: String,
        img_url: String
    },
    comments: [{
        user: { type: Schema.ObjectId, ref: 'User' },
        comment: String,
        timestamp: { type: Date, default: Date.now }
    }],
    status: String
}, {
    timestamps: true
});

module.exports = function() {
    return PostSchema;
}