/**
 * @description Call for user addition
 * 
 * @param {Object} application
 * @param {Object} request
 * @param {Object} response
 */
module.exports.addUser = function(application, req, res) {
    let user = req.body;
    let connection = application.config.dbConnection;
    let UsersModel = new application.app.models.UsersModel(connection);
    let pathUtil = new application.app.util.pathUtil();
    var profile_picture = pathUtil.saveProfilePicture(req, res);
    if (profile_picture.status === 0) {
        res.status(500).json(profile_picture);
        return;
    }

    let dataToSend = {
        password: user.password,
        username: user.username,
        email: user.email,
        name: user.name,
        profile_image: {
            img_name: profile_picture.file_name,
            img_url: profile_picture.url_img_server
        }
    }
    UsersModel.addUser(req, res, dataToSend);
}