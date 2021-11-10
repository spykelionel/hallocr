const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: String,
}, {timestamps: true})

const Role = mongoose.model('Student', roleSchema)
module.exports = Role