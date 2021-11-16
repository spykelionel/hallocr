const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
        required: true
    }
}, {timestamps: true})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room