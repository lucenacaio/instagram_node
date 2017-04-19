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
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    let pathUtil = new application.app.util.pathUtil();
    var moveImage = pathUtil.changePathImage(req, res);
    if (moveImage.status === 0) {
        res.status(500).json(moveImage);
        return;
    }
    let dataToSend = {
        Title: req.body.Title,
        img_name: moveImage.file_name,
        img_url: moveImage.url_img_server
    };
    PostModel.savePost(dataToSend, req, res);
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