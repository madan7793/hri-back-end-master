const Application = require('./application.schema')

// async function updateApplicationData (price){
//     // console.log('pass')
//     await Application.updateOne({planPrice: price}, {planPrice: price}, {upsert: true})
// }

async function UpdatePrice (update){
    await Application.updateOne({planPrice: update.planPrice}, update.update, {upsert: false})
}

async function getApplicationData (){
    const response = await Application.findOne()
    return response;
}

// updateApplicationData(399)

module.exports = {UpdatePrice, getApplicationData}