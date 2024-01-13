const projectImage = require('../../controllers/images_controller');
const passport = require('passport');
const { upload } = require('../../controllers/images_controller');

module.exports = function (router) {
    router.post('/projects/:projectId/upload-images', passport.authenticate("jwt", { session: false }), upload.array('images'), projectImage.uploadImages);
    router.get('/projects/:projectId/upload-images', passport.authenticate("jwt", { session: false }), projectImage.getImages);
}