const ObjectID = require('mongoose').Types.ObjectId;

/**
 * @description Constructor
 * 
 * @param DB connection
 */
function PostModel(application) {
    this.connection = application.config.dbConnection();
    this._model = this.connection.model('Post', application.app.schemas.post);
}

/**
 * @description Get all posts from user
 * 
 * @param {Object} response 
 * @returns [Array] All posts on MongoDB
 */
PostModel.prototype.getAllPosts = function(res) {
    let post = this._model;
    User.findOne({
            _id: userReq._id
        }, '_id username name email profile_image following followers')
        .populate('following', 'username _id name profile_image.img_url')
        .populate("followers", 'username _id name profile_image.img_url')
        .exec(function(err, users) {
            if (err) res.status(400).json({ success: false });
            else res.status(200).json(users);
        });
}

/**
 * @description Get post by Id
 * 
 * @param {Object} response 
 * @returns [Array] All posts on MongoDB
 */
PostModel.prototype.getPostById = function(req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.find(ObjectID(req.params.id)).toArray(function(err, result) {
                if (err) res.json(err);
                else res.json(result);
                mongoclient.close();
            });
        });
    });
}


/**
 * @description Save post
 * 
 * @returns {Object} success
 */
PostModel.prototype.savePost = function(data, user, req, res) {
    data.user = ObjectID(user);
    let Post = new this._model(data);
    Post.save(function(err, post) {
        if (err) {
            res.status(400).json({ success: false })
            console.log(err);
        } else { res.status(201).json({ success: true }); }
    });
}

/**
 * @description Delete post
 * 
 * @returns {Object} 1 if success or 0 if error
 */
PostModel.prototype.deletePost = function(req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.remove({
                    _id: ObjectID(req.params.id)
                },
                function(err, records) {
                    if (err) res.json({ status: 0 });
                    else res.json({ status: 1 });
                    mongoclient.close();
                });
        });
    });
}


/**
 * @description Add comment to picture
 * 
 * @returns {Object} 1 if success or 0 if error
 */
PostModel.prototype.addComment = function(data, req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.update({
                    _id: ObjectID(req.params.id)
                }, {
                    $push: {
                        comments: {
                            id_comment: new ObjectID(),
                            comment: req.body.comment,
                            time: new Date().getTime()
                        }
                    }
                }, {},
                function(err, records) {
                    if (err) res.json({ status: 0 });
                    else res.json({ status: 1 });
                    mongoclient.close();
                });
        });
    });
}

/**
 * @description Delete post
 * 
 * @returns {Object} 1 if success or 0 if error
 */
PostModel.prototype.removeComment = function(req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.update({
                    _id: ObjectID(req.params.id)
                }, {
                    $pull: {
                        comments: {
                            id_comment: ObjectID(req.params.id_comment)
                        }
                    }
                }, {},
                function(err, records) {
                    if (err) res.json({ status: 0 });
                    else res.json({ status: 1 });
                    mongoclient.close();
                });
        });
    });
}


module.exports = function(application) {
    return PostModel;
}