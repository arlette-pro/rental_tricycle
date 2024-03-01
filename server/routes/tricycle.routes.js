const TricycleController = require("../controllers/tricycle.controller")
const { authenticate } = require("../config/jwt.config")
module.exports = (app) => {
    app.get('/api/allTricycles', authenticate, TricycleController.allTricycle)
    app.get('/api/allTricycle/:id', authenticate, TricycleController.getOneTricycle)
    app.post('/api/allTricycle', authenticate, TricycleController.createTricycle)
    app.put('/api/allTricycle/:id', authenticate, TricycleController.updateTricycle)
    app.delete('/api/allTricycle/:ids', authenticate, TricycleController.deleteTricycle)
}