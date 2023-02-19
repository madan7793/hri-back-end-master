const mongoose = require('mongoose')

const subdomainSchema = new mongoose.Schema({
    subdomainId: {
        type: String,
        required: true
    },
    subdomain: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    temlateId:{
        type: String,
        default: 'temp-1'
    }
})

module.exports = mongoose.model('Subdomain', subdomainSchema)