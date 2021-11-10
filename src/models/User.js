const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    gender: String,
    email: {
        type:String,
        required: true
    },
    contact: String,
    profileurl: String,
    isAdmin:  {
        type: Boolean,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    password: String
}, {timestamps: true})

const User = mongoose.model('Student', userSchema)
module.exports = User