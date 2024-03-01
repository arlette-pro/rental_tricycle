const TricycleController = require("../controllers/tricycle.controller")
const { authenticate } = require("../config/jwt.config")
module.exports = app => {
    app.post('/api/allTricycle',  TricycleController.createTricycle)
    app.get('/api/allTricycle/:id',  TricycleController.getOneTricycle)
    app.put('/api/allTricycle/:id',  TricycleController.updateTricycle)
    app.delete('/api/allTricycle/:ids',  TricycleController.deleteTricycle)
}