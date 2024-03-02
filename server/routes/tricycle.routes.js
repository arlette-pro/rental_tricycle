const TricycleController = require("../controllers/tricycle.controller")
const { authenticate } = require("../config/jwt.config")
module.exports = app => {
    app.post('/api/allTricycles',  TricycleController.createTricycle)
    app.get('/api/detailsTricycle/:id',  TricycleController.getOneTricycle)
    app.put('/api/editTricycle/:id',  TricycleController.updateTricycle)
    app.delete('/api/deleteTricycle/:ids',  TricycleController.deleteTricycle)
}