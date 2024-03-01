const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const TricycleSchema = new Schema({
    location:{
        type: String,
        required: [true, "location is required"]
    },
    dropOffLocation: {
        type: Date,
        required: [true, "Drop off location is required"]
    },
    pickUpDate:{
        type: Number,
        required: [true,"Pickup date is required"],
        min: [2023, "the pickup date must be after 2023"]
    },
    pickUpTime:{
        type: Date,
        required: [true, "Pick up time is required"]
    },



}, {timestamps: true})

module.exports = model("Tricycle", TricycleSchema);