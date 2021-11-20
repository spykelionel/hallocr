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
        required: true,
        default: false
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    },
    password: String
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User