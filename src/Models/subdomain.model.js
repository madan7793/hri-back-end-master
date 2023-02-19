const Subdomain = require('./subdomain.schema')

async function CreateSubdomain (subdomainData){
    await Subdomain.updateOne({subdomain: subdomainData.subdomain}, subdomainData, {upsert: true})
}

async function IsSubdomainExisted (subdomain){
    const subdomainData = await Subdomain.findOne({subdomain: subdomain})
    return subdomainData
}

async function ModifySubdomain (subdomainData){
    await Subdomain.updateOne({subdomainId: subdomainData.subdomainId}, subdomainData, {upsert: false})
}

async function GetAllSubdomains (){
    const response = await Subdomain.find()
    return response
}

module.exports = {CreateSubdomain, IsSubdomainExisted, ModifySubdomain, GetAllSubdomains}