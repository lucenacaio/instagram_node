module.exports = function(application) {

    /**
     * @description GET all posts
     * 
     * @method GET @host /api
     * 
     * @return [Array] posts
     */
    application.get('/api', function(req, res) {
        application.app.controllers.post.getPost(application, req, res);
    });

    /**
     * @description GET an especific post
     * 
     * @method GET @host /api
     * 
     * @return [Array] post
     */
    application.get('/api/:id', function(req, res) {
        application.app.controllers.post.getPostById(application, req, res);
    });

    /**
     * @description POST a post
     * 
     * @method POST @host /api
     * 
     * @param {string} Title
     * @param {string} img_url
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.post('/api', function(req, res) {
        application.app.controllers.post.savePost(application, req, res, req.body);
    });


    /**
     * @description PUT a new Title on a post
     * 
     * @method PUT @host /api
     * 
     * @param {string} Title
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.put('/api/:id', function(req, res) {
        application.app.controllers.post.putTitle(application, req, res)
    });

    /**
     * @description DELETE an especific post
     * 
     * @method DELETE @host /api
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.delete('/api/:id', function(req, res) {
        application.app.controllers.post.deletePost(application, req, res);
    });
}