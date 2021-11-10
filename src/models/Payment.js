const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    method: String,
}, {timestamps: true})

const Payment = mongoose.model('Hostel', paymentSchema)
module.exports = Payment