const mongoose = require('mongoose')

// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required: true
    }
   
},{timestamps: true})

mongoose.models = {}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)