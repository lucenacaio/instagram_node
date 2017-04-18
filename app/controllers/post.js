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
module.exports.savePost = function(application, req, res, data) {
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    PostModel.savePost(data, req, res);
}

/**
 * @description Save a new Title post
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.putTitle = function(application, req, res) {
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    let data = req.body;
    PostModel.putTitle(data, req, res);
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