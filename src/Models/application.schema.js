const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    planPrice: Number,
})

module.exports = mongoose.model('Application', applicationSchema)