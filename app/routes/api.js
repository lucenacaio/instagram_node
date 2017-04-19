module.exports = function(application) {

    /**
     * @description GET picture
     * 
     * @method GET @host /uploads/:image
     */
    application.get('/uploads/:image', function(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
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
        res.setHeader("Access-Control-Allow-Origin", "*");
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
        res.setHeader("Access-Control-Allow-Origin", "*");
        application.app.controllers.post.savePost(application, req, res);
    });


    /**
     * @description PUT a new Title on a post
     * 
     * @method PUT @host /api/post/:id
     * 
     * @param {string} Title
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.put('/api/post/:id', function(req, res) {
        application.app.controllers.post.putTitle(application, req, res)
    });

    /**
     * @description DELETE an especific post
     * 
     * @method DELETE @host /api/post/:id
     * 
     * @returns {Object} status = 1 on success and status = 0 on error
     */
    application.delete('/api/post/:id', function(req, res) {
        application.app.controllers.post.deletePost(application, req, res);
    });
}