const mongoose = require('mongoose')

const hostelSchema = new mongoose.Schema({
    hostelNumber: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    numberOfRooms: {
        type: Number,
        required: true
    },
}, {timestamps: true})

const Hostel = mongoose.model('Hostel', hostelSchema)
module.exports = Hostel