const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    method: {
        type:String,
        required: true
    },
}, {timestamps: true})

const Payment = mongoose.model('Hostel', paymentSchema)
module.exports = Payment