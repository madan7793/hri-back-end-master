const mongoose = require('mongoose')

const versionSchema = new mongoose.Schema({
    compatableVersions: Array,
})

module.exports = mongoose.model('Version', versionSchema)