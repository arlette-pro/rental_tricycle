const UserController = require("../controllers/user.controller")
const { authenticate } = require("../config/jwt.config")
module.exports = app => {
    app.post("/api/register", UserController.registerNewUser);
    app.post("/api/login", UserController.loginUser);
    app.post("/api/logout", authenticate, UserController.logoutUser);

    // for all other routes that require you to be loggeg in, you must authenticate to make you're who you really are  
}