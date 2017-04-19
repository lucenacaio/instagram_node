const crypto = require("crypto");
const secret = 'I6nstOagram';

var COLLECTION_NAME = 'users';

function UsersModel(connection) {
    this._connection = connection();
}

UsersModel.prototype.addUser = function(application, req, res, user) {
    let encryptedPassword = crypto.createHmac('sha256', secret).update(user.password).digest('hex');
    user.password = encryptedPassword;
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.find({ username: user.username, email: user.email }).toArray(function(err, result) {
                if (result.length > 0) {
                    res.status(400).json({ msg: ['User already exists'] });
                    let pathUtil = new application.app.util.pathUtil();
                    pathUtil.removeProfilePicture(user.profile_image.img_name);
                    mongoclient.close();
                } else {
                    mongoclient.collection(COLLECTION_NAME, function(err, collection) {
                        collection.insert(user);
                        res.status(201).json({ msg: ['Done'] });
                        mongoclient.close();
                    });
                }
            });
        });

    });
}

module.exports = function() {
    return UsersModel;
}