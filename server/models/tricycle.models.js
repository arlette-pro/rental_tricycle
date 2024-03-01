const mongoose = require('mongoose')

const TricycleSchema = new mongoose.Schema({
    location:{
        type: String,
        required: [true, "location is required"]
    },
    dropOffLocation: {
        type: String,
        required: [true, "Drop off location is required"]
    },
    pickUpDate:{
        type: Number,
        required: true,
        min: [2023, "the pickup date must be after 2023"]
    },
    pickUpTime:{
        type: Date,
        required: [true, "drop up time is required"]
    },
    brands: {
        type: String,
        required: true,
        enum:{values: ['BAZAR','LIFAN', 'APSONIC', 'SAVAJA', 'DAYANG', 'SONLINK', 'YANSUMI', 'NVP'], message: 'brands not in list of album'}
    },


}, {timestamps: true})

const Tricycle = mongoose.model('Tricycle', TricycleSchema);
module.exports = Tricycle;