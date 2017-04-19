const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const secret = 'I6nStO4gr4m';

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

UsersModel.prototype.authenticate = function(application, res, user) {
    let encryptedPassword = crypto.createHmac('sha256', secret).update(user.password).digest('hex');
    user.password = encryptedPassword;
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection(COLLECTION_NAME, function(err, collection) {
            collection.find(user).toArray(function(err, result) {
                if (result.length > 0) {
                    let token = jwt.sign(user, application.get('superSecret'), {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    let userResponse = {
                        success: true,
                        username: result[0].username,
                        name: result[0].name,
                        profile_picture: result[0].profile_picture,
                        token: token
                    }
                    res.status(200).json(userResponse);
                } else {
                    res.json({ success: false, message: 'Authentication failed.' });
                }
            });
        });

    });
}

module.exports = function() {
    return UsersModel;
}