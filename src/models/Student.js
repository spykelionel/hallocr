const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: String,
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
}, {timestamps: true})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student