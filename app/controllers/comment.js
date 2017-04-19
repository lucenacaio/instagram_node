/**
 * @description add comment to picture
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.addComment = function(application, req, res) {
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    let data = req.params.id;
    PostModel.addComment(data, req, res);
}

/**
 * @description remove comment from picture
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.removeComment = function(application, req, res) {
    let connection = application.config.dbConnection;
    let PostModel = new application.app.models.PostModel(connection);
    PostModel.removeComment(req, res);
}