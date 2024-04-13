const mongoose = require('mongoose')

// Orders Schema
const OrderSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: true,
        default: 'unkown'
    },
    product:{
        type:Array,
        required: true 
    },
    orderId:{
        type:String,
        required: true 
    },
    Payement:[{
     type:Array,
     required:true,
     default:'unPaid'
    }],
    address: {
        type:String,
        required: true
    },
    City: {
        type:String,
        required: true
    },
    Region: {
        type:String
    },
    contact: {
        type:String
    },
    Pincode: {
        type:Number,
        required: true
    },
    amount: {
        type:Number,
        required: true
    },
    status: {
        type:String,
        default: 'Pending',
        required: true
    },
},{timestamps: true})

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)