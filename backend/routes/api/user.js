const UserController = require('../../controllers/user_controller');
const passport = require('passport');

module.exports = function (router) {
    router.post('/user', UserController.createUser);
    router.post("/users/authenticate", UserController.authenticate);
}