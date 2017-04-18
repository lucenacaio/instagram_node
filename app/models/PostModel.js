var ObjectID = require('mongodb').ObjectId;
var COLLECTION_NAME = 'post';

/**
 * @description Constructor
 * 
 * @param DB connection
 */
function PostModel(connection) {
    this._connection = connection();
}

/**
 * @description Get all posts
 * 
 * @param {Object} response 
 * @returns [Array] All posts on MongoDB
 */
PostModel.prototype.getAllPosts = function(res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.find().toArray(function(err, result) {
                if (err) res.json(err);
                else res.json(result);
                mongoclient.close();
            });
        });
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
 * @description Save all posts
 * 
 * @returns {Object} 1 if success or 0 if error
 */
PostModel.prototype.savePost = function(data, req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.insert(data, function(err, records) {
                if (err) res.json({ status: 0 });
                else res.status(201).json({ status: 1 });
                mongoclient.close();
            });
        });
    });
}

/**
 * @description Put a new Title on post
 * 
 * @returns {Object} 1 if success or 0 if error
 */
PostModel.prototype.putTitle = function(data, req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.update({
                    _id: ObjectID(req.params.id)
                }, {
                    $set: {
                        Title: req.body.Title
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


module.exports = function() {
    return PostModel;
}