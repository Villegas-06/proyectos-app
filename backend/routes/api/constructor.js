const constructorProject = require('../../controllers/constructor_controller');
const passport = require('passport');

module.exports = function (router) {
    router.get('/constructor_projects', passport.authenticate("jwt", { session: false }), constructorProject.getAll);
    router.post('/constructor_projects', passport.authenticate("jwt", { session: false }), constructorProject.create);
}