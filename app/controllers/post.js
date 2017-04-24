const jwt = require('jsonwebtoken');

/**
 * @description GET all posts
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getPost = function(application, req, res) {
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    PostModel.getAllPosts(res);
}

/**
 * @description GET post by ID
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.getPostById = function(application, req, res) {
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    PostModel.getPostById(req, res);
}

/**
 * @description Save a post
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 * @param {Object} data
 */
module.exports.savePost = function(application, req, res) {
    let token_req = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token_req, application.get('superSecret'), function(err, decoded) {
        if (err) {
            res.status(400).json({ success: false });
            return;
        } else {
            let PostModel = new application.app.models.PostModel(application);
            let pathUtil = new application.app.util.pathUtil();
            var moveImage = pathUtil.changePathImage(req, res);
            if (moveImage.status === 0) {
                res.status(500).json(moveImage);
                return;
            }
            let user = decoded._id;
            let dataToSend = {
                post_picture: {
                    img_name: moveImage.file_name,
                    img_url: moveImage.url_img_server,
                },
                status: req.body.status
            };
            PostModel.savePost(dataToSend, user, req, res);
        }
    });
}

/**
 * @description Delete post
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.deletePost = function(application, req, res) {
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    PostModel.deletePost(req, res);
}