const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId:  {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        default: ''
    },
    shopId: {
        type: String,
        default: ""
    },
    userName: {
        type: String,
        default: "Edit Your Profile"
    },
    phoneNumber: {
        type: Number,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: String,
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/aguruprasad/image/upload/v1673940131/woodline/product-images/no-profile-picture-icon_i5x5nc.png'
    },
    userType: {
        type: String,
        default: 'FREE_TRAIL'
    },
    userStatus: {
        type: String,
        default: "DOMAIN"
    },
    date: {
        type: Date,
        default: Date.now
    },
    notificationEnabled: {
        type: Boolean,
        default: false,
    },
    notificationToken: String,
    orders:{
        type: [{orderId: String, productId: String, productImage: String, productName: String, variant: String, productCount: Number, name: String, email: String, paymentMethod: String, transactionId: String, address: String, totalCartValue: Number, orderStatus: {type: String, default: "PENDING"}, date: {type: Date, default: Date.now}}],
        default: []
    },
    address: {
        type: String
    }
})

module.exports = mongoose.model('User', UserSchema)