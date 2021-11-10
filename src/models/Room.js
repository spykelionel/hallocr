const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    number: {
        type: Number
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel"
    }
}, {timestamps: true})

const Room = mongoose.model('Hostel', roomSchema)
module.exports = Room