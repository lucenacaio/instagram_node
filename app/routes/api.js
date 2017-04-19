module.exports = function(application) {

    /**
     * 
     * Implements User Routes
     * 
     * 
     */

    /**
     * @description POST Call for user addition
     * @method POST @host /user 
     * 
     * @param  {string} name
     * @param  {string} email
     * @param  {string} username
     * @param  {string} password
     * @param  {Object} profile_picture
     */
    application.post('/user', function(req, res) {
        application.app.controllers.user.addUser(application, req, res);
    });

    /**
     * @description POST Login route
     * 
     * @method POST @host /user
     * @param  {string} username
     * @param  {string} password
     */
    application.post('/authenticate', function(req, res) {
        application.app.controllers.user.authenticate(application, req, res);
    });


    /**
     * End User Routes
     */


    /**
     * @description GET picture
     * 
     * @method GET @host /uploads/:image
     */
    application.get('/uploads/:image', function(req, res) {
        application.app.controllers.image.getPicture(application, req, res);
    });

    /**
     * @description GET picture
     * 
     * @method GET @host /uploads/profile/:image
     */
    application.get('/uploads/profile/:image', function(req, res) {
        application.app.controllers.image.getProfilePicture(application, req, res);
    });

    /**
     * @description GET all posts
     * require x-access-token
     * @method GET @host /api/post
     * 
     * @return [Array] posts
     */
    application.get('/api/post', function(req, res) {
        application.app.controllers.post.getPost(application, req, res);
    });

    /**
     * @description GET an especific post
     * require x-access-token
     * @method GET @host /api/post/:id
     * 
     * @return [Array] post
     */
    application.get('/api/post/:id', function(req, res) {
        application.app.controllers.post.getPostById(application, req, res);
    });

    /**
     * @description POST a post
     *  require x-access-token
     * @method POST @host /api/post
     * 
     * @param {string} Title
     * @param {string} img_url
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.post('/api/post', function(req, res) {
        application.app.controllers.post.savePost(application, req, res);
    });


    /**
     * @description ADD comment to picture
     *  require x-access-token
     * @method POST @host /api/post/:id
     * 
     * @param {string} Comment
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.post('/api/post/:id', function(req, res) {
        application.app.controllers.comment.addComment(application, req, res)
    });

    /**
     * @description DELETE an especific comment
     *  require x-access-token
     * @method DELETE @host /api/post/:id
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.delete('/api/post/:id/comment/:id_comment', function(req, res) {
        application.app.controllers.comment.removeComment(application, req, res);
    });
}