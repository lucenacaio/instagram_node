module.exports = function(application) {

    /**
     * @description GET picture
     * 
     * @method GET @host /uploads/:image
     */
    application.get('/uploads/:image', function(req, res) {
        application.app.controllers.image.getPicture(application, req, res);
    });

    /**
     * @description GET all posts
     * 
     * @method GET @host /api/post
     * 
     * @return [Array] posts
     */
    application.get('/api/post', function(req, res) {
        application.app.controllers.post.getPost(application, req, res);
    });

    /**
     * @description GET an especific post
     * 
     * @method GET @host /api/post/:id
     * 
     * @return [Array] post
     */
    application.get('/api/post/:id', function(req, res) {
        application.app.controllers.post.getPostById(application, req, res);
    });

    /**
     * @description POST a post
     * 
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
     * 
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
     * 
     * @method DELETE @host /api/post/:id
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.delete('/api/post/:id/comment/:id_comment', function(req, res) {
        application.app.controllers.comment.removeComment(application, req, res);
    });
}