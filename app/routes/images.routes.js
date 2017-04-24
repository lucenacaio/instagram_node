module.exports = function(application) {
    /**
     * @description GET picture
     * 
     * @method GET @host /uploads/:image
     */
    application.get('/uploads/:image', function(req, res) {
        application.controllers.image.getPicture(application, req, res);
    });

    /**
     * @description GET picture
     * 
     * @method GET @host /uploads/profile/:image
     */
    application.get('*/uploads/profile/:image', function(req, res) {
        application.controllers.image.getProfilePicture(application, req, res);
    });
}