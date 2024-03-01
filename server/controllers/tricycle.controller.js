const Tricycle = require('../models/tricycle.models')

module.exports = {
    allTricycle: (req, res) => {
        Tricycle.find()
        .then((allTricycles) => {
            res.json(allTricycles)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },

    getOneTricycle: (req, res) => {
        Tricycle.findOne({_id: req.params.id})
        .then((OneTricycle) => {
            res.json(OneTricycle)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    //update a tricycle
    updateTricycle: (req, res) => {
        Tricycle.findByIdAndUpdate({_id: req.params.id})
        .then((updateTricycle) =>{
            res.json(updateTricycle)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    createTricycle: (req, res) => {
        Tricycle.create(req.body)
        .then((newTricycle) => {
            res.json(newTricycle)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },

    //delete a tricycle
    deleteTricycle : (req, res) => {
        Tricycle.deleteOne({_id: req.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation) )
        .catch(err = res.json(err))
    }
}