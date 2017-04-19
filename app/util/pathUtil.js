var fs = require('fs');

var pathManager = function(req, res) {
    let date = new Date();
    let img_name = date.getTime() + "_" + req.files.archive.originalFilename
    let sourcePath = req.files.archive.path;
    let targetPath = "./uploads/" + img_name;
    let response = { status: 1, file_name: img_name };
    fs.rename(sourcePath, targetPath, function(err) {
        if (err) {
            res.status(500).json({ status: 0 })
        }
    });
    return response;
}

module.exports = function() {
    return pathManager;
}