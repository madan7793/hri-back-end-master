const Version = require('./version.schema')

async function UpdateVersionControll (update){
    await Version.updateOne({planPrice: update.compatableVersions}, update.update, {upsert: false})
}

async function GetVersionController (){
    const response = await Version.findOne()
    return response;
}

module.exports = {UpdateVersionControll, GetVersionController}