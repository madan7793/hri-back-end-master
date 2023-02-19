const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePic: String,
    passwordEnabled: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        default: ''
    },
    phoneNumber: Number,
    alternateNumber: Number,
    DOB: String,
    gender: String,
    location: String,
    orders:{
        type: [{orderId: String, productId: String, productImage: String, productName: String, hasVariants:Boolean, size: String, color: String, shopId: String, paymentMethod: String, productCount: Number, totalCartValue: Number, orderStatus: {type: String, default: "PENDING"}, address: String, date: {type: Date, default: Date.now}}],
        default: []
    },
    address: {
        type: Object,
        default: {}
    },
})

module.exports = mongoose.model("Customer", CustomerSchema)