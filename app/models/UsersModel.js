const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const secret = 'I6nStO4gr4m';

function UsersModel(application) {
    this.connection = application.config.dbConnection();
    this._model = this.connection.model('User', application.app.schemas.user);
}

UsersModel.prototype.addUser = function(req, res, user) {
    let encryptedPassword = crypto.createHmac('sha256', secret).update(user.password).digest('hex');
    user.password = encryptedPassword;
    let userToSave = new this._model(user);
    userToSave.save(function(err, userToSave) {
        if (err) res.status(400).json({ msg: ['User already exists'] });
        else res.status(201).json({ msg: ['Done'] });
    });
}

UsersModel.prototype.authenticate = function(application, res, user) {
    let encryptedPassword = crypto.createHmac('sha256', secret).update(user.password).digest('hex');
    user.password = encryptedPassword;
    let Person = this._model;
    Person.findOne(user, 'username name profile_image', function(err, person) {
        if (err) return res.status(400).json({ success: false });
        if (person) {
            let authenticateUtil = new application.app.util.authenticateUtil(application);
            let token = authenticateUtil.generateToken(user);
            let userResponse = {
                success: true,
                _id: person._id,
                username: person.username,
                name: person.name,
                profile_picture: person.profile_image,
                token: token
            }
            res.status(200).json(userResponse);
        }
    });
}

UsersModel.prototype.follow = function(req, res, user, userTofollow) {
    // console.log("User ", user);
    // console.log("User To FOllow", userTofollow);
    // let Person = this._model(userTofollow);
    // Person.findOneAndUpdate({ username: user.username }, '', function(err, response) {
    //     if (err) return res.status(400).json({ success: false });
    //     if (response) {

    //     }
    // });
}

module.exports = function(application) {
    return UsersModel;
}