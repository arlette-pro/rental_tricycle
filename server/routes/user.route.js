const UserController = require("../controllers/user.controller")
const { authenticate } = require("../config/jwt.config")
module.exports = app => {
    app.post("/api/user/register", UserController.registerNewUser);
    app.post("/api/user/login", UserController.loginUser);
    app.post("/api/user/logout", UserController.logoutUser);
    app.get('/api/users',  UserController.getAllUsers)
    app.get('/api/user/:id', UserController.getOneUser);
    app.put('/api/user/:id',  UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);

    // for all other routes that require you to be loggeg in, you must authenticate to make you're who you really are  
}